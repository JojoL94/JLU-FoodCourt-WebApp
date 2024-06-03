import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllBeveragetypes,
    createBeveragetype,
    getBeveragetypeByEnumType,
    updateBeveragetype,
    deleteBeveragetype,
} from "../controllers/beveragetypes.js"

const router = express.Router();

router.get('/', getAllBeveragetypes);
router.get('/:enumtype', getBeveragetypeByEnumType);
router.post('/', verifyToken, createBeveragetype);
router.patch('/:enumtype', verifyToken, updateBeveragetype);
router.delete('/:enumtype', verifyToken, deleteBeveragetype);

export default router;