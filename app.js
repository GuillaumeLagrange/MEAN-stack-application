const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

// Connection do database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

mongoose.connection.on('connected', function() {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', function(err) {
    console.log('Database error: ' + err);
});

const app = express();


// Port number
const port = 3000;

// Middlewares
// Cors
app.use(cors());
// Body parser
app.use(bodyParser.json());
// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Static folders
app.use(express.static(path.join(__dirname, "public")));

// Users routing
app.use('/users', users);

// Index route
app.get('/', function(req, res) {
    res.send("Invalid endpoint");
});

app.listen(port, function() {
    console.log('Server started on port ' + port);
});