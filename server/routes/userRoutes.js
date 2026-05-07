import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile route (protected)
router.get('/profile', protect, getUserProfile);

export default router;