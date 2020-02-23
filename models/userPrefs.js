module.exports = (sequelize, DataTypes) => {
  const userPrefs = sequelize.define('userPrefs', {
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
  userPrefs.associate = function(models) {
    userPrefs.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE',
    })
  };
  return userPrefs;
};