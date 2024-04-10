const { connectDatabase } = require('../dbConnection');

class Car {
    static async getAll() {
        try {
            console.log('Fetching cars...');
            const client = await connectDatabase();
            const database = client.db('Cars');
            const collection = database.collection('profile');
            const result = await collection.find().toArray();
            return result;
        } catch (error) {
            console.error('Failed to fetch cars:', error);
            throw error;
        }
    }
}

module.exports = Car;
