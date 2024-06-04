import Beverage from "../models/beverageModel.js";

export const getAllBeverages = async (req, res) => {
    try {
        const beverages = await Beverage.findAll();
        res.json(beverages);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getBeverageByDescription = async (req, res) => {
    try {
        const beverage = await Beverage.findAll({
            where: {
                description: req.params.description
            }
        });
        res.json(beverage[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createBeverage = async (req, res) => {
    try {
        await Beverage.create(req.body);
        res.json({
            "message": "Beverage Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateBeverage = async (req, res) => {
    try {
        await Beverage.update(req.body, {
            where: {
                description: req.params.description
            }
        });
        res.json({
            "message": "Beverage Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteBeverage = async (req, res) => {
    try {
        await Beverage.destroy({
            where: {
                description: req.params.description
            }
        });
        res.json({
            "message": "Beverage Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}