var passport = require('passport');
//var User = require('../app/models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var AzureStrategy = require('passport-azure-ad').BearerStrategy;

// Azure AD Login

var azureOptions =  {
  identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
  resourceURL: 'https://graph.windows.net',
  clientID: "7881dbcd-75f4-4a46-9cc0-ce779b177ab3",
  validateIssuer: true,
  loggingLevel: "info",
  loggingNoPII: true,
  issuer: "https://login.microsoftonline.com/0750ea5f-6147-4205-b8bf-23c1b0a5e183/v2.0", 
  passReqToCallback: false,
  audience: "7881dbcd-75f4-4a46-9cc0-ce779b177ab3"
};

var azureLogin = new AzureStrategy(azureOptions, function(token, done) {
    
    console.log(token.preferred_username, 'sucessfully logged in.');
    if (!token.oid)
        done(new Error('oid is not found in token'));
    else {
        done(null, token);
    }
});

//"374566b3-8f1a-43d2-b298-a1577ee829e0", 


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
