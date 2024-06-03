import RestaurantOwner from "../models/restaurantownerModel.js";

export const getAllRestaurantowners = async (req, res) => {
    try {
        const restaurantowners = await RestaurantOwner.findAll();
        res.json(restaurantowners);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRestaurantownerByFoodstand = async (req, res) => {
    try {
        const restaurantowner = await RestaurantOwner.findAll({
            where: {
                foodstand: req.params.foodstand
            }
        });
        res.json(restaurantowner[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createRestaurantowner = async (req, res) => {
    try {
        await RestaurantOwner.create(req.body);
        res.json({
            "message": "Restaurantowner Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateRestaurantonwer = async (req, res) => {
    try {
        await RestaurantOwner.update(req.body, {
            where: {
                foodstand: req.params.foodstand
            }
        });
        res.json({
            "message": "Restaurantowner Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteRestaurantowner = async (req, res) => {
    try {
        await RestaurantOwner.destroy({
            where: {
                foodstand: req.params.foodstand
            }
        });
        res.json({
            "message": "Restaurantowner Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}