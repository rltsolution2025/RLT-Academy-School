module.exports = {
  apps: [
    {
      name: 'school-backend',
      script: './server.js',
      instance: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
