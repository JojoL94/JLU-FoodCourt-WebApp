import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllDrinksmenus,
    createDrinksmenu,
    getDrinksmenuByTitle,
    updateDrinksmenu,
    deleteDrinksmenu,
} from "../controllers/drinksmenus.js"

const router = express.Router();

router.get('/', getAllDrinksmenus);
router.get('/:title', getDrinksmenuByTitle);
router.post('/', verifyToken, createDrinksmenu);
router.patch('/:title', verifyToken, updateDrinksmenu);
router.delete('/:title', verifyToken, deleteDrinksmenu);

export default router;