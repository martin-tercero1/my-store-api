require('dotenv').config()

const config = {
  env: process.env.NODE_ENV ?? 'production',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT ?? 3000,
  dbEngine: process.env.DB_ENGINE, // postgres
  dbURL: process.env.DATABASE_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
}

module.exports = { config }
