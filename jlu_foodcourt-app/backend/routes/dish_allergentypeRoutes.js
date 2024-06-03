import express from "express";

import {
    getAllDish_AllergenTypes
} from "../controllers/dish_allergentypes.js"

const router = express.Router();

router.get('/', getAllDish_AllergenTypes);

export default router;