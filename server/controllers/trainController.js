import Train from '../models/Train.js';

//  Add a new train
export const addTrain = async (req, res) => {
    try{
        const train = await Train.create(req.body);

        res.status(201).json(train);

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

//  Get all trains
export const getAllTrains = async (req, res) => {
    try{
        const trians = await Train.find();

        res.status(200).json(trians);

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

//  Get a single train
export const getTrainById = async (req, res) => {
    try{
        const train = await Train.findById(req.params.id);

        if (!train){
            return res.status(404).json({ message: 'Train not found' });
        }

        res.status(200).json(train);

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

//  Update a train
export const updateTrain = async (req, res) => {
    try{
        const train = await Train.findByIdAndUpdate(req.params.id);

        if(!train){
            return res.status(404).json({ message: 'Train not found' });
        }

        const updatedTrain = await Train.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
            }
        );

        res.status(200).json(updatedTrain);
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

//  Delete a train
export const deleteTrain = async (req, res) => {
    try{
        const train = await Train.findByIdAndDelete(req.params.id);

        if(!train){
            return res.status(404).json({ message: 'Train not found' });
        }

        await train.deleteOne();

        res.status(200).json({ message: 'Train deleted successfully' });
        
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};