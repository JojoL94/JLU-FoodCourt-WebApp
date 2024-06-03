import Administrators from "../models/administratorModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const administrator = await Administrators.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!administrator[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const username = administrator[0].username;
            const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '10m'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}