const User = require('../models/user');

exports.saveUserForm = async (req, res) => {
    const formData = req.body;
    // console.log('Form data:', formData);
    // console.log('Type of form data:', typeof formData);
    try {
        await User.saveUserForm(formData);
        res.status(200).send();
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send();
    }
}