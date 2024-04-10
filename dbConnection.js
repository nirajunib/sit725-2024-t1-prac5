const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.MONGODB_USERNAME || 'demouser';
const password = process.env.MONGODB_PASSWORD || 'demopass123';
const clusterName = process.env.MONGODB_CLUSTER_NAME || 'sit725';
const uri = `mongodb+srv://${username}:${password}@${clusterName}.y127msc.mongodb.net`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDatabase() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB!");
        // Ping the deployment to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged deployment. Successfully connected to MongoDB!");
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectDatabase };
