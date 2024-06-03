import Beveragetype from "../models/beveragetypeModel.js";

export const getAllBeveragetypes = async (req, res) => {
    try {
        const beveragetypes = await Beveragetype.findAll();
        res.json(beveragetypes);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getBeveragetypeByEnumType = async (req, res) => {
    try {
        const beveragetype = await Beveragetype.findAll({
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json(beveragetype[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createBeveragetype = async (req, res) => {
    try {
        await Beveragetype.create(req.body);
        res.json({
            "message": "Beveragetype Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateBeveragetype = async (req, res) => {
    try {
        await Beveragetype.update(req.body, {
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json({
            "message": "Beveragetype Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteBeveragetype = async (req, res) => {
    try {
        await Beveragetype.destroy({
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json({
            "message": "Beveragetype Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}