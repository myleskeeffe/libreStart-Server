var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var apiUser = require("./app/api/user");
var db = require("./models/")

apiUser(app, db)

var router = require('./app/routes');

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);
