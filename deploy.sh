#!/usr/bin/env bash
# Blubeard Investment AG: release-based deployment. Touches only this app's folder and PM2 process.
#
#   ./deploy.sh              Deploy the latest commit on main
#   ./deploy.sh --rollback   Return to the previous working release
#   ./deploy.sh --list       Show releases
#   ./deploy.sh --verify     Check the live site without changing anything
#
# A release is built in its own folder while the live site keeps running. The switch happens only after a successful
# build, and if the new release fails its checks the previous one is restored automatically.
set -Eeuo pipefail

APP_NAME="blubeard-investment"
BASE="${BLUBEARD_BASE:-/var/www/blubeard-investment}"
PORT="4600"
REPO="https://github.com/THINXIFY/Blubeard-Investment-AG.git"
BRANCH="main"
CANONICAL_HOST="www.blubeard-investment.com"
APEX_HOST="blubeard-investment.com"
KEEP_PREVIOUS=2
LOCAL_PATHS=(/ /about /approach /services /investments /team /partners /contact /privacy /terms /legal-notice /image-credits /sitemap.xml /robots.txt)

RELEASES="$BASE/releases"
SHARED="$BASE/shared"
CURRENT="$BASE/current"

say() { printf '\n==> %s\n' "$*"; }
die() {
  printf '\nERROR: %s\n' "$*" >&2
  exit 1
}

http_code() { curl -s -o /dev/null -m 20 -w '%{http_code}' -H "Host: $CANONICAL_HOST" "http://127.0.0.1:$PORT$1" || true; }

# Checks the app directly on its loopback port. Returns non-zero rather than exiting, so the caller can roll back.
verify_local() {
  local expected page pid running asset code i html
  expected="$(readlink -f "$1")"

  for i in $(seq 1 30); do
    [ "$(http_code /)" = "200" ] && break
    if [ "$i" = "30" ]; then
      echo "  FAIL: no response on 127.0.0.1:$PORT"
      return 1
    fi
    sleep 2
  done

  pid="$(pm2 pid "$APP_NAME" | tail -1)"
  if [ -z "$pid" ] || [ "$pid" = "0" ]; then
    echo "  FAIL: PM2 has no running process"
    return 1
  fi
  running="$(readlink -f "/proc/$pid/cwd" || true)"
  if [ "$running" != "$expected" ]; then
    echo "  FAIL: PM2 is running $running, expected $expected"
    return 1
  fi

  if ! ss -ltnH "sport = :$PORT" | grep -q "127.0.0.1:$PORT"; then
    echo "  FAIL: not bound to 127.0.0.1:$PORT"
    return 1
  fi

  for page in "${LOCAL_PATHS[@]}"; do
    code="$(http_code "$page")"
    if [ "$code" != "200" ]; then
      echo "  FAIL: $page returned $code"
      return 1
    fi
  done

  # One real stylesheet and one real image, taken from the homepage.
  html="$(curl -s -m 20 -H "Host: $CANONICAL_HOST" "http://127.0.0.1:$PORT/" || true)"
  asset="$(grep -oE '/_next/static/[^"]+\.css' <<<"$html" | head -1 || true)"
  if [ -z "$asset" ] || [ "$(http_code "$asset")" != "200" ]; then
    echo "  FAIL: stylesheet did not load"
    return 1
  fi
  asset="$(grep -oE '/_next/static/media/[^"&?]+\.(jpg|jpeg|png|webp|avif)|/media/[^"&?]+\.(jpg|jpeg|png|webp|avif|svg)' <<<"$html" | head -1 || true)"
  if [ -z "$asset" ] || [ "$(http_code "$asset")" != "200" ]; then
    echo "  FAIL: image did not load"
    return 1
  fi

  echo "  OK: $(basename "$expected") answers on 127.0.0.1:$PORT, ${#LOCAL_PATHS[@]} pages, CSS and images"
}

# Swaps the symlink atomically, then restarts this app only.
activate() {
  ln -sfn "$1" "$CURRENT.new"
  mv -Tf "$CURRENT.new" "$CURRENT"
  pm2 startOrReload "$CURRENT/deploy/ecosystem.config.cjs" --only "$APP_NAME" --update-env
}

releases_newest_first() { ls -1dt "$RELEASES"/*/ 2>/dev/null || true; }

previous_release() {
  local cur dir
  cur="$(readlink -f "$CURRENT" 2>/dev/null || true)"
  while IFS= read -r dir; do
    dir="${dir%/}"
    [ -f "$dir/.deployed" ] || continue
    [ "$(readlink -f "$dir")" = "$cur" ] && continue
    echo "$dir"
    return 0
  done < <(releases_newest_first)
}

# Removes failed builds and all but the newest working releases. The live release is never removed.
prune() {
  local cur dir kept=0
  cur="$(readlink -f "$CURRENT")"
  while IFS= read -r dir; do
    dir="${dir%/}"
    [ "$(readlink -f "$dir")" = "$cur" ] && continue
    if [ -f "$dir/.deployed" ] && [ "$kept" -lt "$KEEP_PREVIOUS" ]; then
      kept=$((kept + 1))
      continue
    fi
    echo "  removing old release $(basename "$dir")"
    rm -rf -- "$dir"
  done < <(releases_newest_first)
}

take_lock() {
  exec 9>"$BASE/.deploy.lock"
  flock -n 9 || die "Another deployment is already running."
}

cmd_deploy() {
  [ -f "$SHARED/.env.local" ] || die "$SHARED/.env.local is missing. See docs/deploy-vps.md."
  grep -q '^NEXT_PUBLIC_SITE_URL=https://' "$SHARED/.env.local" || die "NEXT_PUBLIC_SITE_URL must be set in .env.local."
  take_lock

  local id release previous commit
  id="$(date +%Y%m%d-%H%M%S)"
  release="$RELEASES/$id"
  previous=""
  if [ -e "$CURRENT" ]; then previous="$(readlink -f "$CURRENT")"; fi
  mkdir -p "$RELEASES" "$SHARED/.data" "$SHARED/logs"

  say "Fetching $BRANCH"
  git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$release"
  commit="$(git -C "$release" log -1 --format='%h %s')"
  echo "  $commit"
  ln -sfn "$SHARED/.env.local" "$release/.env.local"
  ln -sfn "$SHARED/.data" "$release/.data"

  say "Installing dependencies"
  (cd "$release" && npm ci --include=dev --no-audit --no-fund)

  say "Building (the live site is not affected)"
  (cd "$release" && NEXT_TELEMETRY_DISABLED=1 npm run build)

  say "Switching to $id"
  if activate "$release" && verify_local "$release"; then
    touch "$release/.deployed"
    echo "$commit" >"$release/.commit"
  else
    say "New release failed its checks"
    if [ -n "$previous" ]; then
      echo "  restoring $(basename "$previous")"
      activate "$previous" || true
      if verify_local "$previous"; then
        die "Deployment failed. The previous release is live again."
      fi
      die "Deployment failed AND the restored release did not pass. Check: pm2 logs $APP_NAME"
    fi
    pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
    rm -f "$CURRENT"
    die "First deployment failed, so nothing is running. Check the output above."
  fi

  say "Cleaning up"
  prune
  # Keep the runner up to date with the release it just deployed.
  install -m 755 "$release/deploy.sh" "$BASE/deploy.sh"

  say "Deployed: $commit"
  echo "  Check the public site with ./deploy.sh --verify. Undo with ./deploy.sh --rollback"
}

cmd_rollback() {
  take_lock
  local target current
  current="$(readlink -f "$CURRENT")"
  target="$(previous_release)"
  [ -n "$target" ] || die "No previous working release is available."
  say "Rolling back to $(basename "$target")"
  activate "$target"
  if verify_local "$target"; then
    # The release left behind is no longer a rollback target, or the next rollback would bounce straight back to it.
    rm -f "$current/.deployed"
    say "Rollback complete: $(cat "$target/.commit" 2>/dev/null || basename "$target")"
  else
    say "That release failed its checks, returning to $(basename "$current")"
    activate "$current" || true
    verify_local "$current" || die "Restoring also failed. Check: pm2 logs $APP_NAME"
    die "Rollback failed. The site is back on $(basename "$current")."
  fi
}

cmd_list() {
  local cur dir mark
  cur="$(readlink -f "$CURRENT" 2>/dev/null || true)"
  while IFS= read -r dir; do
    dir="${dir%/}"
    mark="  "
    if [ "$(readlink -f "$dir")" = "$cur" ]; then mark="* "; fi
    echo "$mark$(basename "$dir")  $(cat "$dir/.commit" 2>/dev/null || echo '(not deployed)')"
  done < <(releases_newest_first)
}

# Read-only check of the public site. Sends no email and prints no secrets.
cmd_verify() {
  local fail=0 code url count name dir
  check() { # label expected actual
    if [ "$2" = "$3" ]; then
      echo "  OK    $1"
    else
      echo "  FAIL  $1 (expected $2, got $3)"
      fail=1
    fi
  }
  redirect() { curl -s -o /dev/null -m 20 -w '%{http_code} %{redirect_url}' "$1" || true; }
  public() { curl -s -o /dev/null -m 20 -w '%{http_code}' "$1" || true; }

  say "Public site"
  check "https://$CANONICAL_HOST/" 200 "$(public "https://$CANONICAL_HOST/")"
  check "http apex redirects" "301 https://$CANONICAL_HOST/" "$(redirect "http://$APEX_HOST/")"
  check "http www redirects" "301 https://$CANONICAL_HOST/" "$(redirect "http://$CANONICAL_HOST/")"
  check "https apex redirects" "301 https://$CANONICAL_HOST/" "$(redirect "https://$APEX_HOST/")"

  say "Every page in the sitemap"
  count=0
  while IFS= read -r url; do
    count=$((count + 1))
    code="$(public "$url")"
    if [ "$code" != "200" ]; then
      echo "  FAIL  $url returned $code"
      fail=1
    fi
  done < <(curl -s -m 20 "https://$CANONICAL_HOST/sitemap.xml" | grep -oE "<loc>https://$CANONICAL_HOST[^<]*" | sed 's/<loc>//' || true)
  if [ "$count" -gt 0 ]; then
    echo "  checked $count URLs"
  else
    echo "  FAIL  sitemap is empty or not on the live domain"
    fail=1
  fi

  say "Private material stays private"
  check "/private/documents is not served" 404 "$(public "https://$CANONICAL_HOST/private/documents")"
  check "/private/documents/README.md is not served" 404 "$(public "https://$CANONICAL_HOST/private/documents/README.md")"
  check "/.env.local is not served" 404 "$(public "https://$CANONICAL_HOST/.env.local")"

  say "Private Documents configuration"
  check "document API rejects another origin (Host forwarded)" 403 "$(curl -s -o /dev/null -m 20 -w '%{http_code}' -X POST \
    -H 'Origin: https://example.com' -H 'Content-Type: application/json' -d '{}' \
    "https://$CANONICAL_HOST/api/request-documents/start" || true)"
  for name in RESEND_API_KEY DOCUMENTS_FROM_EMAIL OTP_HASH_SECRET DOCUMENTS_DIR; do
    check "$name has a value" yes "$(grep -qE "^$name=.+" "$SHARED/.env.local" && echo yes || echo no)"
  done
  dir="$(sed -nE 's/^DOCUMENTS_DIR=//p' "$SHARED/.env.local" | tail -1)"
  count="$(find "$dir" -maxdepth 1 -iname '*.pdf' -readable 2>/dev/null | wc -l)"
  check "documents folder has readable PDFs" yes "$([ "$count" -gt 0 ] && echo yes || echo no)"
  echo "        ($count PDFs)"

  say "Process"
  check "PM2 status" online "$(pm2 jlist | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const a=JSON.parse(s).find(p=>p.name==='$APP_NAME');console.log(a?a.pm2_env.status:'missing')})")"
  check "loopback only on $PORT" yes "$(ss -ltnH "sport = :$PORT" | grep -q "127.0.0.1:$PORT" && echo yes || echo no)"

  say "Certificate"
  echo | openssl s_client -connect "$CANONICAL_HOST:443" -servername "$CANONICAL_HOST" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | sed 's/^/  /' || {
    echo "  FAIL  could not read the certificate"
    fail=1
  }

  echo
  if [ "$fail" = "0" ]; then
    echo "All checks passed."
    return 0
  fi
  die "Some checks failed."
}

case "${1:-}" in
  "") cmd_deploy ;;
  --rollback) cmd_rollback ;;
  --list) cmd_list ;;
  --verify) cmd_verify ;;
  *) die "Unknown option: $1 (use --rollback, --list or --verify)" ;;
esac
