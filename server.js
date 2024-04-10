var express = require("express")
var app = express()
app.use(express.static(__dirname + '/public'))
const bodyParser = require('body-parser');
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.port || 3000;

// connect to database
const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.MONGODB_USERNAME || 'demouser';
const password = process.env.MONGODB_PASSWORD || 'demopass123';
const clusterName = process.env.MONGODB_CLUSTER_NAME || 'sit725';
const uri = `mongodb+srv://${username}:${password}@${clusterName}.y127msc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged deployment. Successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

app.post('/saveUserForm', async (req, res) => {
    const formData = req.body;

    try {
        // console.log('Form data received:', formData);
        // Connect to MongoDB
        await client.connect();

        // Access the target database and collection
        const database = client.db('UserForm');
        const collection = database.collection('profile');

        // Insert the form data document into the collection
        const result = await collection.insertOne(formData);
        // console.log(result.insertedId);
        if (result.insertedId !== undefined && result.insertedId !== null) {
            console.log('Form data saved successfully:', result.insertedId);
            res.status(200).send();
        } else {
            console.error('Error saving form data: No document inserted');
            res.status(500).send();
        }
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send();
    } finally {
        // Ensure that the client will close when finished or in case of an error
        await client.close();
    }
});


app.listen(port, () => {
    console.log("Server running at port: " + port)
})
