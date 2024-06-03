import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Dishtype = db.define('dishtype', {
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

export default Dishtype;