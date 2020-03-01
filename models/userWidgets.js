module.exports = (sequelize, DataTypes) => {
  const userWidgets = sequelize.define('userWidgets', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      widgetType: DataTypes.INTEGER,
      widgetData: DataTypes.JSON,
      status: DataTypes.BOOLEAN,
      posSize: DataTypes.JSON
    },
    {
      freezeTableName: true,
    }
  );

  userWidgets.associate = (models) => {
    userWidgets.belongsTo(models.user, {foreignKey: 'userId', as: 'user'});
    userWidgets.belongsTo(models.definedWidgets, {foreignKey: 'widgetType', as: 'widget'})
  };

  return userWidgets;
}
