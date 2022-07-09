require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.PORT || 8000;
const url = process.env.DATABASE_URL;


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(url)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err));


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

app.listen(port, function () {
    console.log(`Server is running at port ${port}`);
})