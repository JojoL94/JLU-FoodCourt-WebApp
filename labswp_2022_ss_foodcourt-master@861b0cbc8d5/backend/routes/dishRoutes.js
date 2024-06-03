import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllDishes,
    createDish,
    getDishByDescription,
    updateDish,
    deleteDish,
} from "../controllers/dishes.js"

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:description', getDishByDescription);
router.post('/', verifyToken, createDish);
router.patch('/:description', verifyToken, updateDish);
router.delete('/:description', verifyToken, deleteDish);

export default router;