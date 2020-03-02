var AuthenticationController = require('./controllers/authentication'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    UserController = require('./controllers/users')

var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        apiNone = express.Router()

    // Auth Routes
    // (All accessed via /api/auth/...)
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireOnlineSSO, AuthenticationController.login);
    authRoutes.get('/sso', requireOnlineSSO);
    authRoutes.get('/test', requireOnlineSSO, function(req, res){
        console.log(req.user.preferred_username, "accessed the testing api route.");
        res.send({ content: 'Sucessfully accessed web api with user: ' + req.user.name + " " + req.user.preferred_username + " " + req.user.InternalUserId});
    });


    // apiUsers.get('/', UserController.getUsers);
    apiNone.get('*', (req, res) => res.status(200).send({message: 'Welcome to the LibreStart API. Documentation is available at github.com/myleskeeffe/libreStart-Server'}))

    // Set up routes
    app.use('/api', apiRoutes);
    // app.use('/users', apiUsers);
    app.use('/', apiNone)

}
