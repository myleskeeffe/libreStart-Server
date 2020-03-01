module.exports = (sequelize, DataTypes) => {
  const definedWidgets = sequelize.define('definedWidgets', {
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

  definedWidgets.associate = (models) => {
    definedWidgets.hasMany(models.userWidgets, {foreignKey: 'widgetType'});
  };

  return definedWidgets;
}
