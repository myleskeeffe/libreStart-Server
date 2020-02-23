module.exports = (sequelize, DataTypes) => {
  const UserWidgets = sequelize.define('userWidgets', {
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

  UserWidgets.associate = (models) => {
    UserWidgets.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };

  return UserWidgets;
}
