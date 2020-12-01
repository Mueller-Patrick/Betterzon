module.exports = {
  apps : [{
    name: "Backend",
    script: 'dist/index.js',
    watch: '.',
    env: {
         "PORT": '3000',
         "DB_HOST": 'localhost',
         "DB_USER": 'betterzon_admin',
         "DB_PASSWORD": 'FezcxEfXWH6sgJfZLfY9Cd5Fyu2NTwEM7i8j',
         "DB_DATABASE": 'betterzon_dev'
    },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};