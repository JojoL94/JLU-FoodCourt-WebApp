import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllMenus,
    createMenu,
    getMenuByTitle,
    updateMenu,
    deleteMenu,
} from "../controllers/menus.js"

const router = express.Router();

router.get('/', getAllMenus);
router.get('/:title', getMenuByTitle);
router.post('/', verifyToken, createMenu);
router.patch('/:title', verifyToken, updateMenu);
router.delete('/:title', verifyToken, deleteMenu);

export default router;