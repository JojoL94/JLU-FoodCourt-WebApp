//Database connection
import { Sequelize } from "sequelize";

const db = new Sequelize('Speisen_couldleast', 'Speisen_couldleast', 'f69b53ecb72f439b65978e3b4ab82fb1ab990870', {
    host: "h16.h.filess.io",
    port: "3305",
    dialect: 'mariadb',
    dialectOptions: {
        options: {
            requestTimeout: 5000
        }
    },
});

export default db;