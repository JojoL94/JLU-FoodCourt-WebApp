import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Dish = db.define('dish', {
    Description: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    DishTypeEnumType: {
        type: DataTypes.STRING,
        references: 'dishtype',
        referencesKey: 'EnumType',
        validate: {
            notEmpty: true
        }
    },
    MenuTitle: {
        type: DataTypes.STRING,
        references: 'menu',
        referencesKey: 'Title',
        validate: {
            notEmpty: true
        }
    },
    Price: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: true
        }
    },
    Available: {
        type: DataTypes.BOOLEAN,
        validate: {
            notEmpty: true
        }
    },
    Image: {
        type: DataTypes.BLOB,
        validate: {
            notEmpty: false
        }
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Dish;
