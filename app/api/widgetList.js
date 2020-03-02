var passportService = require('../../config/passport');
var passport = require('passport');
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = (app, db) => {
    app.get( "/api/content/widgets/", requireOnlineSSO, (req, res) =>
      db.definedWidgets.findAll().then( (result) => res.json(result) )
    );

    app.get( "/api/content/widgets/:id", requireOnlineSSO, (req, res) =>
      db.definedWidgets.findByPk(req.params.id).then( (result) => res.json(result))
    );

  }