//Database connection
import { Sequelize } from "sequelize";

const db = new Sequelize('database', 'username', 'password', {
    host: "tlm.h.filess.io",
    port: "3305",
    dialect: 'mariadb',
    dialectOptions: {
        options: {
            requestTimeout: 5000
        }
    },
});

export default db;
