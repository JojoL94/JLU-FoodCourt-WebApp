//Database connection
import { Sequelize } from "sequelize";

const db = new Sequelize('jluFoodCourtWebApp_tornwiseto', 'jluFoodCourtWebApp_tornwiseto', 'b62e31993ded7f315285cb1387dd0e750aeb2386', {
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