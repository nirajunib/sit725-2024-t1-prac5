const { connectDatabase } = require('../dbConnection');

class User {
    static async saveUserForm(formData) {
        // console.log(typeof formData);
        // console.log(formData);
        try {
            if (!formData || typeof formData !== 'object') {
                throw new Error('Invalid form data');
            }

            const client = await connectDatabase();
            const database = client.db('UserForm');
            const collection = database.collection('profile');
            const result = await collection.insertOne(formData);
            return result;
        } catch (error) {
            console.error('Failed to save user form data:', error);
            throw error;
        }
    }
}

module.exports = User;