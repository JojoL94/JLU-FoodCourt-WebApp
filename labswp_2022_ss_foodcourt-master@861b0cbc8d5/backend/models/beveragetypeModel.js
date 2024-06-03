import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Beveragetype = db.define('beveragetype', {
    EnumType: {
        type: DataTypes.STRING,
        primaryKey: true
    },
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Beveragetype;