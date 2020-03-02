var passportService = require('../../config/passport');
var passport = require('passport');
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});

module.exports = (app, db) => {
    app.get( "/api/user/widgets/", requireOnlineSSO, (req, res) =>
      (res.json({"Message": "A valid and authenticated User ID is required for this endpoint."}))
    );

    app.get( "/api/user/widgets/:id", requireOnlineSSO, (req, res) =>
      db.userWidgets.findAll({where: {userId: req.params.id}}).then( (result) => res.json(result))
    );
  
    app.post("/api/user/widgets/", requireOnlineSSO, (req, res) => 
      db.userWidgets.create({
        userId: req.body.userId,
        widgetType: req.body.widgetType,
        widgetData: req.body.widgetData,
        status: req.body.status,
        posSize: req.body.posSize
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/api/user/widgets/:id", requireOnlineSSO, (req, res) =>
      db.userWidgets.update({
        userId: req.body.userId,
        widgetType: req.body.widgetType,
        widgetData: req.body.widgetData,
        status: req.body.status,
        posSize: req.body.posSize
      },
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );

  }