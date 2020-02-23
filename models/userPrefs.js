module.exports = (sequelize, DataTypes) => {
  const UserPrefs = sequelize.define('userPrefs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      backgroundURL: DataTypes.STRING,
      preferredUnits: DataTypes.STRING,
      dtmFormat: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );

  UserPrefs.associate = (models) => {
    UserPrefs.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };

  return UserPrefs;
}
