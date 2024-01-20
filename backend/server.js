const express = require('express');
const connectDB = require('./database/database');
connectDB();
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes')
require('dotenv').config();
// set up a basic express 
const app = express();

// Add your express routes and middleware here
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments',commentRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
