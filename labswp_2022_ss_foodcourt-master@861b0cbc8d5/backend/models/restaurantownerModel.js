import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Restaurantowner = db.define('restaurantowner', {
    FoodStand: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Firstname: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    Lastname: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Restaurantowner;