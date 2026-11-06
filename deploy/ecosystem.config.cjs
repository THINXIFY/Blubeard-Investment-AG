// PM2 process file. Run from the project root: pm2 start deploy/ecosystem.config.cjs
// One instance only: rate limits are held in memory and one-time codes in a local file, so cluster mode would break them.
module.exports = {
  apps: [
    {
      name: "blubeard",
      cwd: `${__dirname}/..`,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      env: { NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" },
    },
  ],
};
