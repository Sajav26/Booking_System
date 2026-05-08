import Booking from "../models/Booking.js";
import Train from "../models/Train.js";

// SEARCH TRAINS
export const searchTrains = async (req, res) => {

    try {

        const { from, to, journeyDate } = req.query;

        const trains = await Train.find({
            from,
            to,
            journeyDate,
        });

        res.json(trains);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

// BOOK TRAIN SEATS
export const bookTrainSeats = async (req, res) => {

    try {

        const {
            trainId,
            className,
            seatsBooked,
        } = req.body;

        // Find train
        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({
                message: "Train not found",
            });
        }

        // Find class
        const trainClass = train.classes.find(
            (cls) => cls.className === className
        );

        if (!trainClass) {
            return res.status(404).json({
                message: "Class not found",
            });
        }

        // Check seat availability
        if (trainClass.availableSeats < seatsBooked) {
            return res.status(400).json({
                message: "Not enough seats available",
            });
        }

        // Reduce available seats
        trainClass.availableSeats -= seatsBooked;

        await train.save();

        // Calculate price
        const totalPrice =
            trainClass.price * seatsBooked;

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            train: train._id,
            className,
            seatsBooked,
            totalPrice,
        });

        res.status(201).json({
            message: "Booking successful",
            booking,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

// USER BOOKINGS
export const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user._id,
        }).populate("train");

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};