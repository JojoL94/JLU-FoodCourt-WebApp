import Administrator from "../models/administratorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.findAll();
        res.json(administrators);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAdministratortByUsername = async (req, res) => {
    try {
        const adminstrator = await Administrator.findAll({
            where: {
                username: req.params.username
            }
        });
        res.json(adminstrator[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createAdministrator = async (req, res) => {
    const { username, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Passwort und Passwort Bestätigung stimmen nicht überein" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Administrator.create({
            username: username,
            password: hashPassword
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.log(error);
    }
}

export const updateAdministrator = async (req, res) => {
    const administrator = await Administrator.findAll({
        where: {
            username: req.params.username
        }
    });
    const match = await bcrypt.compare(req.body.currentPassword, administrator[0].password);
    if (!match) return res.status(400).json({ msg: "Das aktuelle Passwort ist nicht korrekt" });
    if (req.body.newPassword !== req.body.confNewPassword) return res.status(400).json({ msg: "Das neue Passwort und die Bestätigung des neuen Passwortes stimmen nicht überein" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
    try {
        await Administrator.update({
            password: hashPassword
        }, {
            where: {
                username: req.params.username
            }
        });
        res.json({
            "message": "Administrator Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAdministrator = async (req, res) => {
    try {
        await Administrator.destroy({
            where: {
                username: req.params.username
            }
        });
        res.json({
            "message": "Administrator Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const Login = async (req, res) => {
    try {
        const administrator = await Administrator.findAll({
            where: {
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, administrator[0].password);
        if (!match) return res.status(400).json({ msg: "Falsches Passwort" });
        const username = administrator[0].username;
        const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
        });
        const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Administrator.update({ refresh_token: refreshToken }, {
            where: {
                username: username
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Unbekannter Benutzername" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const administrator = await Administrator.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!administrator[0]) return res.sendStatus(204);
    const username = administrator[0].username;
    await Administrator.update({ refresh_token: null }, {
        where: {
            username: username
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}