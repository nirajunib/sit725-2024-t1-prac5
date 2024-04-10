const express = require('express');
const router = express.Router();
const User = require('../controllers/User');

// Middleware to parse JSON-formatted request bodies
router.use(express.json());

router.post('/saveUserForm', User.saveUserForm);

module.exports = router;
