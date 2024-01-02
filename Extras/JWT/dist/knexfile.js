"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'admin5',
        password: 'admin5',
        database: 'pfa-5iir',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
};
exports.default = config;
