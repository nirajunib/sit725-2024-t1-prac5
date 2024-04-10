const express = require("express")
const app = express()
const { connectDatabase } = require('./dbConnection');
const userRoutes = require('./routes/User');
const carRoutes = require('./routes/Car');


// Connect to the database
connectDatabase()
    .then(() => {
        app.use('/', userRoutes);
        app.use('/', carRoutes);
        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/views');
        app.use(express.static('public'));

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    })
    .catch(error => {
        console.error('An unexpected error occurred:', error);
        process.exit(1);
    });


app.get('/', function (req, res) {
    res.render('index');
});