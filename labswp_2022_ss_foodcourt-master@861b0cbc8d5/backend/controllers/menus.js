import Menu from "../models/menuModel.js";

export const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMenuByTitle = async (req, res) => {
    try {
        const menu = await Menu.findAll({
            where: {
                title: req.params.title
            }
        });
        res.json(menu[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createMenu = async (req, res) => {
    try {
        await Menu.create(req.body);
        res.json({
            "message": "Menu Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateMenu = async (req, res) => {
    try {
        await Menu.update(req.body, {
            where: {
                title: req.params.title
            }
        });
        res.json({
            "message": "Menu Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteMenu = async (req, res) => {
    try {
        await Menu.destroy({
            where: {
                title: req.params.title
            }
        });
        res.json({
            "message": "Menu Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}