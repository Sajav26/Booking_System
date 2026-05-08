import express from 'express';
import {
    addTrain,
    getAllTrains,
    getTrainById,
    updateTrain,
    deleteTrain
} from '../controllers/trainController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllTrains);
router.get('/:id', getTrainById);

// Admin routes
router.post('/', protect, admin, addTrain);
router.put('/:id', protect, admin, updateTrain);
router.delete('/:id', protect, admin, deleteTrain);

export default router;