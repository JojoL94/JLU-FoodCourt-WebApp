import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Administrator = db.define('administrator', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Administrator;