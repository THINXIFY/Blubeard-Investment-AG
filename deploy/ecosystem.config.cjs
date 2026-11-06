// PM2 process for this app only. deploy.sh runs it through the `current` symlink, so each release starts in its own folder.
// One instance only: rate limits are held in memory and one-time codes in a local file, so cluster mode would break them.
const base = "/var/www/blubeard-investment";

module.exports = {
  apps: [
    {
      name: "blubeard-investment",
      cwd: `${base}/current`,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4600 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      exp_backoff_restart_delay: 200,
      kill_timeout: 8000,
      out_file: `${base}/shared/logs/app.log`,
      error_file: `${base}/shared/logs/app-error.log`,
      time: true,
      env: { NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" },
    },
  ],
};
