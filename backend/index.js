require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


const app = express();
const port = process.env.PORT || 8000;
const url = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(url)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('welcome');
})

app.listen(port, function () {
    console.log(`Server is running at port ${port}`);
})