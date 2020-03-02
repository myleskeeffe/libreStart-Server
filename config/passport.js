var passport = require('passport');
//var User = require('../app/models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var AzureStrategy = require('passport-azure-ad').BearerStrategy;
var db = require('../models');
// Azure AD Login

var azureOptions =  {
  identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
  resourceURL: 'https://graph.windows.net',
  clientID: "7881dbcd-75f4-4a46-9cc0-ce779b177ab3",
  validateIssuer: true,
  loggingLevel: "warn",
  loggingNoPII: true,
  issuer: "https://login.microsoftonline.com/0750ea5f-6147-4205-b8bf-23c1b0a5e183/v2.0", 
  passReqToCallback: false,
  audience: "7881dbcd-75f4-4a46-9cc0-ce779b177ab3"
};

var currentDate = new Date();
var dateString = currentDate.toISOString();


var azureLogin = new AzureStrategy(azureOptions, function(token, done) {
    console.log(dateString + ' | ' + token.preferred_username + ' attempting login via AzureAD SSO.');
    db.user.findOne({limit: 1, where: {externalUsername: token.preferred_username}}).then(function(userDeets){
        if (!userDeets) {
            console.log(dateString + ' | User ' + token.preferred_username + ' was not found in the internal database.');
            //return({error: 'User ' + token.preferred_username + ' was not found in the internal database. Please ask your admin to register you, or access the registration endpoint if available.'});
            return done(null, false, {error: 'Login Failed.'});
        }
        else {
            if (!token.oid)
                done(new Error('oid is not found in token'));
            else {
                console.log(dateString + " | Found external user " + token.preferred_username + " in databse with internal id of " + userDeets.id);
                token.InternalUserId = userDeets.id;
                done(null, token);
            }
        }
    });
});


// LOCAL LOGIN
// var localOptions = {
//     usernameField: 'email'
// };
// 
// var localLogin = new LocalStrategy(localOptions, function(email, password, done){
// 
//     User.findOne({
//         email: email
//     }, function(err, user){
// 
//         if(err){
//             return done(err);
//         }
// 
//         if(!user){
//             return done(null, false, {error: 'Login failed. Please try again.'});
//         }
// 
//         user.comparePassword(password, function(err, isMatch){
// 
//             if(err){
//                 return done(err);
//             }
// 
//             if(!isMatch){
//                 return done(null, false, {error: 'Login failed. Please try again.'});
//             }
// 
//             return done(null, user);
// 
//         });
// 
//     });
// 
// });
// 
// var jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeader(),
//     secretOrKey: config.secret
// };
// 
// var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
// 
//     User.findById(payload._id, function(err, user){
// 
//         if(err){
//             return done(err, false);
//         }
// 
//         if(user){
//             done(null, user);
//         } else {
//             done(null, false);
//         }
// 
//     });
// 
// });
// 
// passport.use(jwtLogin);
// passport.use(localLogin);
passport.use(azureLogin);
