var AuthenticationController = require('./controllers/authentication'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('oauth-bearer', {session: false});
var requireLogin = passport.authenticate('oauth-bearer', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router()

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', function(req, res){
        res.send({ content: 'Success'});
    });

    // Set up routes
    app.use('/api', apiRoutes);

}
