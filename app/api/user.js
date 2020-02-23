module.exports = (app, db) => {
    app.get( "/users", (req, res) =>
      db.user.findAll().then( (result) => res.json(result) )
    );
  
    app.get( "/users/:id", (req, res) =>
      db.user.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/users", (req, res) => 
      db.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        externalUsername: req.body.externalUsername,
        role: req.body.role,
        tags: req.body.tags,
        password: req.body.password
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/users/:id", (req, res) =>
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
  
    app.delete( "/users/:id", (req, res) =>
      db.user.destroy({
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  }