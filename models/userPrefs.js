module.exports = (sequelize, DataTypes) => {
  const UserPrefs = sequelize.define('UserPrefs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
      backgroundURL: DataTypes.STRING,
      preferredUnits: DataTypes.STRING,
      dtmFormat: DataTypes.STRING
  }, {});
  UserPrefs.associate = function(models) {
    UserPrefs.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE',
    })
  };
  return UserPrefs;
};