import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Beverage = db.define('beverage', {
    Description: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    BeverageTypeEnumType: {
        type: DataTypes.STRING,
        references: 'beveragetype',
        referencesKey: 'EnumType',
        validate: {
            notEmpty: true
        }
    },
    DrinksMenuTitle: {
        type: DataTypes.STRING,
        references: 'drinksmenu',
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
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Beverage;