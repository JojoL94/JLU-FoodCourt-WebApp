import Drinksmenu from "../models/drinksmenuModel.js";

export const getAllDrinksmenus = async (req, res) => {
    try {
        const menus = await Drinksmenu.findAll();
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getDrinksmenuByTitle = async (req, res) => {
    try {
        const drinksmenu = await Drinksmenu.findAll({
            where: {
                title: req.params.title
            }
        });
        res.json(drinksmenu[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createDrinksmenu = async (req, res) => {
    try {
        await Drinksmenu.create(req.body);
        res.json({
            "message": "Drinksmenu Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateDrinksmenu = async (req, res) => {
    try {
        await Drinksmenu.update(req.body, {
            where: {
                title: req.params.title
            }
        });
        res.json({
            "message": "Drinksmenu Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteDrinksmenu = async (req, res) => {
    try {
        await Drinksmenu.destroy({
            where: {
                title: req.params.title
            }
        });
        res.json({
            "message": "Drinksmenu Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}