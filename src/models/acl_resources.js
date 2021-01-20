'use strict';
module.exports = (sequelize, DataTypes) => {
  const acl_resources = sequelize.define('acl_resources', {
    key: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    value: DataTypes.STRING
  }, {});
  acl_resources.associate = function(models) {
    // associations can be defined here
  };
  return acl_resources;
};