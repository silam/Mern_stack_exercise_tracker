const express = require('express');
const mongoose = require('mongoose');

const userRouter = require("./route/users");
const exerciseRouter = require("./route/exercises");



// not need in new express
const bodyparser = require('body-parser');

const cors = require('cors');

// env in dotenv
require('dotenv').config();

const app = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json()); // allow to parse json

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MongoDB connected successfully");
});



app.use('/users', userRouter);
app.use("/exercises", exerciseRouter);

app.listen(port, () => {
    console.log(`server listens on port ${port}`);
});
