const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'admin',
    password: '123456',
    database: process.env.DB_DEV,
    host: '127.0.0.1',
    dialect: "postgres",
  },
  test: {
    use_env_variable: 'DB_TEST',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DB_PROD',
    dialect: 'postgres',
    logging: false
  },
};
