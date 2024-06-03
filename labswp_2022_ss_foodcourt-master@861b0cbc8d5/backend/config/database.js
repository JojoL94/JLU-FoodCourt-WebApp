//Database connection
import { Sequelize } from "sequelize";

const db = new Sequelize('bg22foodcourt', 'BG22FoodCourtUser', 'FoodCourtPw', {
    host: "seserver.se.hs-heilbronn.de",
    port: "3406",
    dialect: 'mariadb',
    dialectOptions: {
        options: {
            requestTimeout: 5000
        }
    },
});

export default db;