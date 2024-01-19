const express = require('express');
const connectDB = require('./database/database');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
require('dotenv').config();

connectDB();
// set up a basic express 
const app = express();

// Add your express routes and middleware here
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
