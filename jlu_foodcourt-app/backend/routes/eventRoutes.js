import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";

import {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/events.js"

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, createEvent);
router.patch('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

export default router;