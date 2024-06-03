import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Dish_AllergenType = db.define('dish_allergentype', {
    DishDescription: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    AllergenTypeEnumType: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Dish_AllergenType;