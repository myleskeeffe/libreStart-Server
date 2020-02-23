module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    externalUsername: DataTypes.STRING,
    role: DataTypes.STRING,
    tags: DataTypes.JSON,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // // associations can be defined here
    // User.hasOne(models.userPrefs, {
    //   foreignKey: 'userId',
    //   as: 'userPreferences',
    //   onDelete: 'CASCADE',s
    // });

    user.hasMany(models.userWidgets, {
      foreignKey: 'userId',
      as: 'widgets',
      onDelete: 'CASCADE',
    });
  };
  return user;
};
