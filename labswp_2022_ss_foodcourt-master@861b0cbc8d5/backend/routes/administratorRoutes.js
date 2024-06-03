import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllAdministrators,
    createAdministrator,
    getAdministratortByUsername,
    updateAdministrator,
    deleteAdministrator
} from "../controllers/administrators.js"

const router = express.Router();

router.get('/', verifyToken, getAllAdministrators);
router.get('/:username', verifyToken, getAdministratortByUsername);
router.post('/', verifyToken, createAdministrator);
router.patch('/:username', verifyToken, updateAdministrator);
router.delete('/:username', verifyToken, deleteAdministrator);

export default router;