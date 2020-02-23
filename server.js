var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

const db = massive({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
  user: databaseConfig.user,
  password: databaseConfig.password
});

app.set('db', db);



app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);
