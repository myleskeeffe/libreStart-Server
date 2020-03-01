module.exports = (app, db) => {
    app.get( "/api/user/widgets/", (req, res) =>
      (res.json({"Message": "A valid and authenticated User ID is required for this endpoint."}))
    );

    app.get( "/api/user/widgets/:id", (req, res) =>
      db.userWidgets.findAll({where: {userId: req.params.id}}).then( (result) => res.json(result))
    );
  
    app.post("/api/user/widgets/", (req, res) => 
      db.userWidgets.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/api/user/widgets/:id", (req, res) =>
      db.userWidgets.update({
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