module.exports = (sequelize, DataTypes) => {
  const DefinedWidgets = sequelize.define('definedWidgets', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      widgetName: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );

  DefinedWidgets.associate = (models) => {
    DefinedWidgets.hasMany(models.userWidgets, {as: 'userWidgets'});
  };  

  return DefinedWidgets;
}
