const dotenv = require('dotenv')

dotenv.config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "UNSET JWT SECRET",
    DB: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "mysql",
        password: process.env.DB_PASSWORD || "secret",
        database: process.env.DB_NAME || "mysql",
    },
}

