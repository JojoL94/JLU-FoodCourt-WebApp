import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllBeverages,
    createBeverage,
    getBeverageByDescription,
    updateBeverage,
    deleteBeverage,
} from "../controllers/beverages.js"

const router = express.Router();

router.get('/', getAllBeverages);
router.get('/:description', getBeverageByDescription);
router.post('/', verifyToken, createBeverage);
router.patch('/:description', verifyToken, updateBeverage);
router.delete('/:description', verifyToken, deleteBeverage);

export default router;