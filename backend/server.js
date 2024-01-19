const express = require('express');
const mongoose = require('mongoose');
// set up a basic express and mongoose to connect mongoDB
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Add your server logic here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Add your express routes and middleware here

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
