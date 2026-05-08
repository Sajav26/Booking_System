import express from 'express';
import { searchTrains, bookTrainSeats, getMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Search Trains
router.get('/search', searchTrains);

// Book a Train
router.post('/book', protect, bookTrainSeats);

// User booking History
router.get('/my-bookings', protect, getMyBookings);

export default router;