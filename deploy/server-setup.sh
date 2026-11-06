#!/usr/bin/env bash
# First-time setup on the shared VPS. Run it as the user that owns the existing PM2 apps.
#
#   bash deploy/server-setup.sh check     Read-only inspection. Changes nothing.
#   bash deploy/server-setup.sh install   Runs the same checks and stops on any conflict, then sets up this site.
#
# Safe to re-run. It adds its own folder, PM2 process, Nginx site and certificate, and changes nothing belonging to other
# projects. It never restarts other PM2 apps, and only reloads Nginx after `nginx -t` passes.
set -Eeuo pipefail

APP_NAME="blubeard-investment"
BASE="/var/www/blubeard-investment"
PORT="4600"
CERT_NAME="blubeard-investment"
CERT_EMAIL="${CERT_EMAIL:-info@blubeard-investment.com}"
APEX="blubeard-investment.com"
WWW="www.blubeard-investment.com"
DOCS_DIR="/srv/blubeard-private/documents"
SITE_AVAILABLE="/etc/nginx/sites-available/$APP_NAME"
SITE_ENABLED="/etc/nginx/sites-enabled/$APP_NAME"
CERT_DIR="/etc/letsencrypt/live/$CERT_NAME"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SUDO=""
if [ "$(id -u)" -ne 0 ]; then SUDO="sudo"; fi

problems=0
say() { printf '\n==> %s\n' "$*"; }
die() {
  printf '\nERROR: %s\n' "$*" >&2
  exit 1
}
ok() { echo "  OK       $*"; }
bad() {
  echo "  PROBLEM  $*"
  problems=$((problems + 1))
}

# Other apps' name, pid, status and restart count, to prove at the end that none of them changed.
other_apps() {
  pm2 jlist | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{for(const p of JSON.parse(s).filter(p=>p.name!=='$APP_NAME').sort((a,b)=>a.name<b.name?-1:1))console.log([p.name,p.pid,p.pm2_env.status,p.pm2_env.restart_time].join(' '))})"
}

cmd_check() {
  local tool listener avail me_ip ip name
  problems=0

  say "Tools"
  for tool in git node npm pm2 nginx certbot curl ss flock openssl; do
    if command -v "$tool" >/dev/null; then ok "$tool"; else bad "$tool is not installed"; fi
  done
  if command -v node >/dev/null; then
    if node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)"; then
      ok "Node $(node -v) (20.9 or newer is required)"
    else
      bad "Node $(node -v) is too old. Add a newer one with nvm rather than changing the version other apps use."
    fi
  fi
  [ "$problems" -eq 0 ] || {
    echo "  Install the missing tools, then run this again. Nothing has been changed."
    return 1
  }

  say "Shared server"
  echo "  Existing PM2 apps:"
  pm2 list --no-color | sed 's/^/    /'

  listener="$(ss -ltnH "sport = :$PORT" || true)"
  if [ -z "$listener" ]; then
    ok "port $PORT is free"
  elif pm2 pid "$APP_NAME" 2>/dev/null | grep -qE '^[1-9]'; then
    ok "port $PORT is used by $APP_NAME (re-run)"
  else
    bad "port $PORT is already in use: $listener"
  fi

  if pm2 jlist | grep -q "\"name\":\"$APP_NAME\""; then
    ok "PM2 process $APP_NAME exists (re-run)"
  else
    ok "PM2 name $APP_NAME is free"
  fi

  if $SUDO nginx -t >/dev/null 2>&1; then
    ok "current Nginx configuration is valid"
  else
    bad "Nginx configuration is already invalid. Fix that first: sudo nginx -t"
  fi
  if grep -qE 'include[[:space:]]+/etc/nginx/sites-enabled/' /etc/nginx/nginx.conf 2>/dev/null; then
    ok "Nginx loads sites-enabled"
  else
    bad "Nginx does not include sites-enabled, so this setup would not load"
  fi
  if [ -e "$SITE_AVAILABLE" ]; then
    ok "Nginx site $APP_NAME exists (re-run)"
  elif $SUDO nginx -T 2>/dev/null | grep -E '^[[:space:]]*server_name' | grep -qE "[[:space:]](www\.)?blubeard-investment\.com([[:space:];]|$)"; then
    bad "another Nginx site already claims this domain"
  else
    ok "no other Nginx site claims this domain"
  fi

  if [ -d "$BASE" ] && [ ! -d "$BASE/shared" ]; then
    bad "$BASE exists but was not created by this setup. Look at it first."
  else
    ok "project folder is available"
  fi

  avail="$(df -BG --output=avail /var/www 2>/dev/null | tail -1 | tr -dc 0-9 || true)"
  if [ "${avail:-0}" -ge 5 ]; then
    ok "disk: $avail GB free"
  else
    bad "disk: ${avail:-0} GB free, 5 GB recommended (each release holds its own build and dependencies)"
  fi
  echo "  Memory: $(free -h | awk '/^Mem:/{print $7" available of "$2}') (a build can use over 1 GB)"

  say "DNS"
  me_ip="$(curl -s -m 10 https://api.ipify.org || true)"
  for name in "$APEX" "$WWW"; do
    ip="$(getent ahostsv4 "$name" | awk 'NR==1{print $1}' || true)"
    if [ -n "$me_ip" ] && [ "$ip" = "$me_ip" ]; then
      ok "$name points to this server ($ip)"
    else
      bad "$name points to ${ip:-nothing}, this server is ${me_ip:-unknown}"
    fi
  done

  say "Result"
  if [ "$problems" -eq 0 ]; then
    echo "  No conflicts found."
    return 0
  fi
  echo "  $problems problem(s) to resolve. Nothing has been changed."
  return 1
}

# Validates before reload, and puts the previous file back if validation fails. Reads the site from stdin.
install_nginx_site() {
  local tmp backup=""
  tmp="$(mktemp)"
  cat >"$tmp"
  if [ -e "$SITE_AVAILABLE" ]; then
    backup="$(mktemp)"
    $SUDO cp "$SITE_AVAILABLE" "$backup"
  fi
  $SUDO install -m 644 "$tmp" "$SITE_AVAILABLE"
  $SUDO ln -sfn "$SITE_AVAILABLE" "$SITE_ENABLED"
  if ! $SUDO nginx -t; then
    if [ -n "$backup" ]; then
      $SUDO install -m 644 "$backup" "$SITE_AVAILABLE"
    else
      $SUDO rm -f "$SITE_ENABLED" "$SITE_AVAILABLE"
    fi
    die "Nginx rejected the new site. The change was undone and Nginx was not reloaded."
  fi
  $SUDO systemctl reload nginx
  rm -f "$tmp" "$backup"
  ok "Nginx validated and reloaded"
}

cmd_install() {
  cmd_check || die "Resolve the problems above, then run this again."
  local me before env
  me="$(id -un)"
  before="$(other_apps)"
  env="$BASE/shared/.env.local"

  say "Folders"
  $SUDO install -d -m 755 -o "$me" -g "$me" "$BASE" "$BASE/releases" "$BASE/acme"
  $SUDO install -d -m 700 -o "$me" -g "$me" "$BASE/shared" "$BASE/shared/.data"
  $SUDO install -d -m 755 -o "$me" -g "$me" "$BASE/shared/logs"
  $SUDO install -d -m 700 -o "$me" -g "$me" /srv/blubeard-private "$DOCS_DIR"
  install -m 755 "$SRC/deploy.sh" "$BASE/deploy.sh"
  ok "created"

  say "Settings"
  if [ ! -f "$env" ]; then
    (
      umask 077
      {
        echo "NEXT_PUBLIC_SITE_URL=https://$WWW"
        echo "RESEND_API_KEY="
        echo 'DOCUMENTS_FROM_EMAIL="Blubeard Investment AG <info@blubeard-investment.com>"'
        echo "OTP_HASH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
        echo "DOCUMENTS_DIR=$DOCS_DIR"
      } >"$env"
    )
    ok "created $env with a new one-time-code secret"
  fi
  chmod 600 "$env"
  grep -qE '^RESEND_API_KEY=.+' "$env" || die "Add RESEND_API_KEY to $env and upload the PDFs to $DOCS_DIR, then run this again. See docs/deploy-vps.md."
  [ -n "$(find "$DOCS_DIR" -maxdepth 1 -iname '*.pdf' -print -quit)" ] || die "No PDFs in $DOCS_DIR yet. See docs/deploy-vps.md, then run this again."
  find "$DOCS_DIR" -maxdepth 1 -iname '*.pdf' -exec chmod 600 {} +
  ok "settings and documents are in place"

  say "First release"
  if [ -e "$BASE/current" ]; then
    ok "already deployed, leaving it as it is"
  else
    (cd "$BASE" && ./deploy.sh)
  fi

  say "Nginx and HTTPS"
  if $SUDO test -f "$CERT_DIR/fullchain.pem"; then
    ok "certificate already exists"
  else
    # A temporary HTTP-only site, just long enough to prove ownership of the domain.
    install_nginx_site <<NGINX
server {
    listen 80;
    server_name $APEX $WWW;
    location ^~ /.well-known/acme-challenge/ { root $BASE/acme; }
    location / { return 404; }
}
NGINX
    $SUDO certbot certonly --webroot -w "$BASE/acme" --cert-name "$CERT_NAME" -d "$WWW" -d "$APEX" \
      --non-interactive --agree-tos -m "$CERT_EMAIL" --deploy-hook "systemctl reload nginx"
  fi
  install_nginx_site <"$SRC/deploy/nginx-blubeard-investment.conf"

  say "Automatic renewal"
  $SUDO certbot renew --dry-run --cert-name "$CERT_NAME"
  if systemctl is-active --quiet certbot.timer; then
    ok "certbot.timer is active"
  else
    echo "  NOTE     certbot.timer is not active. Confirm how renewals are scheduled on this server."
  fi

  say "Survive reboots"
  if [ -f "$HOME/.pm2/dump.pm2" ]; then
    cp "$HOME/.pm2/dump.pm2" "$HOME/.pm2/dump.pm2.before-blubeard-$(date +%Y%m%d%H%M%S)"
  fi
  # `pm2 save` records the process list. It does not restart anything.
  pm2 save
  if systemctl is-enabled --quiet "pm2-$me" 2>/dev/null; then
    ok "PM2 startup service pm2-$me is already enabled"
  else
    $SUDO env "PATH=$PATH" "$(command -v pm2)" startup systemd -u "$me" --hp "$HOME"
  fi

  say "Other apps"
  if [ "$before" = "$(other_apps)" ]; then
    ok "all other PM2 apps are unchanged (same process IDs and restart counts)"
  else
    echo "  PROBLEM  the PM2 list changed during setup:"
    diff <(echo "$before") <(other_apps) || true
  fi

  "$BASE/deploy.sh" --verify
}

case "${1:-check}" in
  check) cmd_check ;;
  install) cmd_install ;;
  *) die "Use: server-setup.sh check | install" ;;
esac
