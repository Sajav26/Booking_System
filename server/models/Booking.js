import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    train: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Train',
        required : true
    },

    className: {
        type: String,
        required: true
    },

    seatsBooked: [
        {
            type: String,
            required: true
        },
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Completed'
    },
},
{
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;