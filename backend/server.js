const express = require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const connectDB = require('./database/database');
connectDB();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes')
// set up a basic express 
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments',commentRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
