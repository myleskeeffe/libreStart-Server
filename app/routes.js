var AuthenticationController = require('./controllers/authentication'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    UserController = require('./controllers/users')

var requireAuth = passport.authenticate('oauth-bearer', {session: false});
var requireLogin = passport.authenticate('oauth-bearer', {session: false});
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        apiUsers = express.Router(),
        apiNone = express.Router()

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/sso', requireOnlineSSO);
    authRoutes.get('/test', requireOnlineSSO, function(req, res){
        console.log(req.user.preferred_username, "accessed the testing api route.");
        res.redirect('/');
    });

    authRoutes.get('/protected', function(req, res){
        res.send({ content: 'Success'});
    });

    // apiUsers.get('/', UserController.getUsers);
    apiNone.get('*', (req, res) => res.status(200).send({message: 'Welcome to the LibreStart API. Documentation is available at github.com/myleskeeffe/libreStart-Server'}))

    // Set up routes
    app.use('/api', apiRoutes);
    // app.use('/users', apiUsers);
    app.use('/', apiNone)

}
