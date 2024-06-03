import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllDishtypes,
    createDishtype,
    getDishtypeByEnumType,
    updateDishtype,
    deleteDishtype,
} from "../controllers/dishtypes.js"

const router = express.Router();

router.get('/', getAllDishtypes);
router.get('/:enumtype', getDishtypeByEnumType);
router.post('/', verifyToken, createDishtype);
router.patch('/:enumtype', verifyToken, updateDishtype);
router.delete('/:enumtype', verifyToken, deleteDishtype);

export default router;