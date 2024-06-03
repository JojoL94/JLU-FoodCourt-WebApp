import express from "express";

import {
    getAllAllergenTypes
} from "../controllers/allergentypes.js"

const router = express.Router();

router.get('/', getAllAllergenTypes);

export default router;