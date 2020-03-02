var passportService = require('../../config/passport');
var passport = require('passport');
var requireOnlineSSO = passport.authenticate('oauth-bearer', {session: false});
var groups = require('../../config/groups');

var currentDate = new Date();
var dateString = currentDate.toISOString();

module.exports = (app, db) => {
    app.get( "/api/user/prefs/:id", requireOnlineSSO, (req, res) =>
      {
        if (req.params.id == req.user.InternalUserId) {
          db.userPrefs.findByPk(req.params.id).then( (result) => res.json(result))
        }
        else if (groups.admins.includes(req.user.InternalUserId)) {
          db.userPrefs.findByPk(req.params.id).then( (result) => res.json(result))
          console.log(dateString + " | Admin override for action: Access User Prefs by: " + req.user.InternalUserId + " for user: " + req.params.id);
        }
        else {
          res.json({error: "You do not have permission to view this endpoint."})
        }
      });

    app.get( "/api/user/prefs/", requireOnlineSSO, (req, res) =>
      db.userPrefs.findOne({limit: 1, where: {userId: req.user.InternalUserId}}).then( (result) => res.json(result))
    );
  
    app.post("/api/user/prefs/", requireOnlineSSO, (req, res) => 
    {
      if (db.userPrefs.findOne({limit: 1, where: {userId: req.user.InternalUserId}})) {
        res.json({error: "User prefs already exist. Please use a PUT request."})
      }
      else {
        db.userPrefs.create({
          userId: req.user.InternalUserId,
          backgroundURL: req.body.backgroundURL,
          preferredUnits: req.body.preferredUnits,
          dtmFormat: req.body.dtmFormat
        }).then( (result) => res.json(result) )
      }

    }
    );
  
    app.put("/api/user/prefs/:id", requireOnlineSSO, (req, res) =>
    {
      if (req.params.id == req.user.InternalUserId) {
        db.userPrefs.update({
          userId: req.params.id,
          backgroundURL: req.body.backgroundURL,
          preferredUnits: req.body.preferredUnits,
          dtmFormat: req.body.dtmFormat
        },
        {
          where: {
            id: req.params.id
          }
        }).then( (result) => res.json(result) )
      }
      else if (groups.admins.includes(req.user.InternalUserId)) {
        console.log("Updating", req.params.id)
        db.userPrefs.update({
          userId: req.params.id,
          backgroundURL: req.body.backgroundURL,
          preferredUnits: req.body.preferredUnits,
          dtmFormat: req.body.dtmFormat
        },
        {
          where: {
            id: req.params.id
          }
        }).then( (result) => res.json(result) )
        console.log(dateString + " | Admin override for action: Update User Prefs by: " + req.user.InternalUserId + " for user: " + req.params.id);
      }
      else {
        res.json({error: "You do not have permission to access/update this endpoint."})

      }
    }
      
    );

  }
