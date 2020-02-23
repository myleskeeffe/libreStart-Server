module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    },
    {
      freezeTableName: true,
    }
  );

  return User;
}
