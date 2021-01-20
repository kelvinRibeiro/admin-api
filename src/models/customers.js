'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    uuid: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cod:                 DataTypes.INTEGER,
    customer_type: {
      type: DataTypes.ENUM,
      values: ['pf','pj']
    },
    name:                DataTypes.STRING,
    observations:        DataTypes.TEXT,
    zipcode: 				     DataTypes.STRING,
    street: 				     DataTypes.STRING,
    number: 				     DataTypes.STRING,
    complement: 				 DataTypes.STRING,
    neighborhood: 	     DataTypes.STRING,
    city: 					     DataTypes.STRING,
    ibge_cod_city: 	     DataTypes.STRING,
    state: 					     DataTypes.STRING,
    uf: 					       DataTypes.STRING,
    ibge_cod_state:      DataTypes.STRING,
    cellphone: 					 DataTypes.STRING,    
    cellphone2: 				 DataTypes.STRING,
    phone: 							 DataTypes.STRING,
    cellphone_contact: 	 DataTypes.STRING,
    phone_contact: 			 DataTypes.STRING,
    responsible_contact: DataTypes.STRING,
    email1: 						 DataTypes.STRING,
    email2: 						 DataTypes.STRING,
    email3: 						 DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  customers.associate = function(models) {
    models.customers.hasOne(models.customer_pfs, { as: 'pf', foreignKey: 'customer_uuid' })
    models.customers.hasOne(models.customer_pjs, { as: 'pj', foreignKey: 'customer_uuid' })
  };
  return customers;
};