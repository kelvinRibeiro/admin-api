'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_pjs = sequelize.define('customer_pjs', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customer_uuid: DataTypes.UUID,
    cnpj: DataTypes.UUID,
    company_name: DataTypes.STRING,
    ie: DataTypes.STRING,
    im: DataTypes.STRING
  }, {});
  customer_pjs.associate = function(models) {
    models.customer_pjs.belongsTo(models.customers, { as: 'customers', foreignKey: 'customer_uuid' })
  };
  return customer_pjs;
};