import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Event = db.define('event', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        validate: {
            notEmpty: true
        }
    },
    EndDate: {
        type: DataTypes.DATEONLY,
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

export default Event;