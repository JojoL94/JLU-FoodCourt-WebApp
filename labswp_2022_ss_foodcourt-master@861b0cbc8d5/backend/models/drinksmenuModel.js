import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Drinksmenu = db.define('drinksmenu', {
    Title: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    RestaurantOwnerFoodStand: {
        type: DataTypes.STRING,
        references: 'restaurantowner',
        referencesKey: 'FoodStand',
        validate: {
            notEmpty: true
        }
    },
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Drinksmenu;