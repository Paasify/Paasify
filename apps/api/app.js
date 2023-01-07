var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var createRouter = require('./routes/create');

var app = express();

var corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.all(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-type, Accept");
    next();
})
app.use('/api/users/', usersRouter);
app.use('/api/users/auth/', authRouter);
app.use('/api/apps/', createRouter);

module.exports = app;
