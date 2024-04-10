const Car = require('../models/car');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.getAll();
        res.json(cars);
    } catch (error) {
        console.error('Failed to fetch cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
};
