import Dish_AllergenType from "../models/dish_allergentypeModel.js";

export const getAllDish_AllergenTypes = async (req, res) => {
    try {
        const beverages = await Dish_AllergenType.findAll();
        res.json(beverages);
    } catch (error) {
        res.json({ message: error.message });
    }
}