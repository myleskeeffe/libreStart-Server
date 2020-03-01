var passportService = require('../../config/passport');
var passport = require('passport');
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = (app, db) => {
    app.get( "/api/user/prefs/:id", requireOnlineSSO, (req, res) =>
      db.userPrefs.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/api/user/prefs/", requireOnlineSSO, (req, res) => 
      db.userPrefs.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/api/user/prefs/:id", requireOnlineSSO, (req, res) =>
      db.userPrefs.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      },
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );

  }