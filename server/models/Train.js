import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },

    totalSeats:{
        type: Number,
        required: true
    },

    availableSeats: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
});

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },

    trainNumber:{
        type: String,
        required: true,
        unique: true
    },
    
    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    departureTime: {
        type: String,
        required: true
    },

    arrivalTime: {
        type: String,
        required: true
    },

    journeyDate: {
        type: Date,
        required: true
    },

    classes: [classSchema]
},

{
    timestamps: true
}
);

const Train = mongoose.model('Train', trainSchema);

export default Train;