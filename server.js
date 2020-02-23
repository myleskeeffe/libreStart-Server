var express  = require('express');
var app      = express();
var massive = require('massive');
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

//mongoose.connect(databaseConfig.url);
const cn = {
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password
};
const db = massive(cn);


app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
//app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);
