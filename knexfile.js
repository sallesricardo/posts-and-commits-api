const { DB } = require('./src/settings');

module.exports = {
    client: 'mysql2',
    connection: {
        host: DB.host,
        port: DB.port,
        user: DB.user,
        password: DB.password,
        database: DB.database,
    },
};


