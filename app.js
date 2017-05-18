const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// Middlewares

// Cors
app.use(cors());
// Body parser
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', function(req, res) {
    res.send("Invalid endpoint");
});

app.listen(port, function() {
    console.log('Server started on port ' + port);
});