import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const AllergenType = db.define('allergentype', {

    EnumType: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default AllergenType;