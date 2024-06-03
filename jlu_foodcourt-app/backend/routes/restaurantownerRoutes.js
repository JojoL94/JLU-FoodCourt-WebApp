import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllRestaurantowners,
    createRestaurantowner,
    getRestaurantownerByFoodstand,
    updateRestaurantonwer,
    deleteRestaurantowner
} from "../controllers/restaurantowners.js"

const router = express.Router();

router.get('/', verifyToken, getAllRestaurantowners);
router.get('/:foodstand', verifyToken, getRestaurantownerByFoodstand);
router.post('/', verifyToken, createRestaurantowner);
router.patch('/:foodstand', verifyToken, updateRestaurantonwer);
router.delete('/:foodstand', verifyToken, deleteRestaurantowner);

export default router;