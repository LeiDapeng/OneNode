var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var redirect = require('./routes/redirect');
var upload = require('./routes/upload');
var mysql = require('./routes/mysql');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/sql', mysql)
app.use('/fn', upload)
app.use('/', redirect);
;

module.exports = app;
