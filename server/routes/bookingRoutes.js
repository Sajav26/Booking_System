import express from 'express';
import { searchTrains, bookTrainSeats, getMyBookings, getSeatAvailability } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Search Trains
router.get('/search', searchTrains);

// Book a Train
router.post('/', protect, bookTrainSeats);

// User booking History
router.get('/my-bookings', protect, getMyBookings);

// Get Seat Availability
router.get('/seat-availability', protect, getSeatAvailability);

export default router;