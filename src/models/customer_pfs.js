'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_pfs = sequelize.define('customer_pfs', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customer_uuid: DataTypes.UUID,
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    nacionality: DataTypes.STRING,
    martial_status: {
      type: DataTypes.ENUM,
      values: ['single','married','death']
    },
    profission: DataTypes.STRING
  }, {});
  customer_pfs.associate = function(models) {
    models.customer_pfs.belongsTo(models.customers, { as: 'customers', foreignKey: 'customer_uuid' })
  };
  return customer_pfs;
};