const path = require('node:path');
module.exports = {
  apps: [{
    name: 'assistpro',
    cwd: __dirname,
    script: 'dist/index.js',
    node_args: ['--env-file=' + path.resolve(__dirname, '.env.production')],
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    kill_timeout: 15000,
    env: { NODE_ENV: 'production', LOG_TO_FILE: 'false' },
    time: true
  }]
};
