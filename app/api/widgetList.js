module.exports = (app, db) => {
    app.get( "/api/content/widgets/", (req, res) =>
      db.definedWidgets.findAll().then( (result) => res.json(result) )
    );

    app.get( "/api/content/widgets/:id", (req, res) =>
      db.definedWidgets.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/api/content/widgets/", (req, res) => 
      db.definedWidgets.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/api/content/widgets/:id", (req, res) =>
      db.definedWidgets.update({
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