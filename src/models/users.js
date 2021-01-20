'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cod: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};