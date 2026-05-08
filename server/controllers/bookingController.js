import Booking from '../models/Booking.js';
import Train from '../models/Train.js';

//  Serach Trains
export const searchTrains = async (req, res) => {
    try{
        const { from, to, journeyDate } = req.query;

        const trains = await Train.find({
            from,
            to,
            journeyDate,
        });

        res.status(200).json(trains);

    }catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
};

// Book a Train
export const bookTrainSeats = async (req, res) => {
    try{
        const { trainId, className, seatsBooked } = req.body;

        // Find the train
        const train = await Train.findById(trainId);

        if(!train){
            return res.status(404).json({ message: 'Train not found' });
        }

        // Find the class details
        const trainClass = train.classes.find((cls) => cls.className === className);

        if(!trainClass){
            return res.status(404).json({ message: 'Class not found' });
        }

        // Check if enough seats are available
        if(trainClass.availableSeats < seatsBooked){
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Reduce the available seats
        trainClass.availableSeats -= seatsBooked;
        await train.save();

        // Calculate price
        const totalPrice = trainClass.price * seatsBooked;

        // Create a booking
        const booking = await Booking.create({
            user: req.user._id,
            train: train._id,
            className,
            seatsBooked,
            totalPrice,
        });

        res.status(201).json({ message: 'Booking successful', booking });

    }catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
};

//  Get User Bookings
export const getMyBookings = async (req, res) => {
    try{
        const bookings = await Booking.find({
            user: req.user._id
        }).populate('train');

        res.status(200).json(bookings);

    }catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
};