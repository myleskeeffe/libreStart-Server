var passportService = require('../../config/passport');
var passport = require('passport');
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = (app, db) => {
    app.get( "/api/user/users", requireOnlineSSO, (req, res) =>
      db.user.findAll().then( (result) => res.json(result) )
    );
  
    app.get( "/api/user/users/:id", requireOnlineSSO, (req, res) =>
      db.user.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/api/user/users", requireOnlineSSO, (req, res) => 
      db.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/api/user/users/:id", requireOnlineSSO, (req, res) =>
      db.user.update({
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
  
    app.delete( "/api/user/users/:id", requireOnlineSSO, (req, res) =>
      db.user.destroy({
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  }