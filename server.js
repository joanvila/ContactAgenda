var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var cors = require('cors');

var app = express();
app.use(cors());
//mongoose
require('./models/index').initialize();
var mongoose = require('mongoose');
mongoose.connect(config.db_path);

//This middleware allow us to treat the body of the request as a json object.
app.use(bodyParser.json());

var contactRouter = require('./routes/contacts');
var userRouter = require('./routes/users');
var authRouter = require('./routes/authentication');
app.use('/contacts' ,contactRouter);
app.use('/users', userRouter);
app.use('/authenticate', authRouter);


http.createServer(app).listen(8080, function(){
    console.log('Listening on port 8080');
});

