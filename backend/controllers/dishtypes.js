import Dishtype from "../models/dishtypeModel.js";

export const getAllDishtypes = async (req, res) => {
    try {
        const dishtypes = await Dishtype.findAll();
        res.json(dishtypes);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getDishtypeByEnumType = async (req, res) => {
    try {
        const dishtype = await Dishtype.findAll({
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json(dishtype[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createDishtype = async (req, res) => {
    try {
        await Dishtype.create(req.body);
        res.json({
            "message": "Dishtype Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateDishtype = async (req, res) => {
    try {
        await Dishtype.update(req.body, {
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json({
            "message": "Dishtype Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteDishtype = async (req, res) => {
    try {
        await Dishtype.destroy({
            where: {
                enumtype: req.params.enumtype
            }
        });
        res.json({
            "message": "Dishtype Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}