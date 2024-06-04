import AllergenType from "../models/allergentypeModel.js";

export const getAllAllergenTypes = async (req, res) => {
    try {
        const allergenTypes = await AllergenType.findAll();
        res.json(allergenTypes);
    } catch (error) {
        res.json({ message: error.message });
    }
}