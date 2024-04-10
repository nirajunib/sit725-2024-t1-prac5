const express = require('express');
const router = express.Router();
const Car = require('../controllers/Car');

router.get('/cars', Car.getAllCars);

module.exports = router;
