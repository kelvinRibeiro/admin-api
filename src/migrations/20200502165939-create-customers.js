'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        index: true
      },
      cod: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      customer_type: {
        type: Sequelize.ENUM,
        values: ['pf','pj']
      },
      name:  { 
        type: Sequelize.STRING
      },
      observations:  { 
        type: Sequelize.STRING
      },
      zipcode: 	{ 
        type: Sequelize.STRING
      },
      street: 	{ 
        type: Sequelize.STRING
      },
      number: 	{ 
        type: Sequelize.STRING
      },
      complement: 	{ 
        type: Sequelize.STRING
      },
      neighborhood: { 
        type: Sequelize.STRING
      },
      city: { 
        type: Sequelize.STRING
      },
      ibge_cod_city: 	{ 
        type: Sequelize.STRING
      },
      state: 	{ 
        type: Sequelize.STRING
      },
      uf: { 
        type: Sequelize.STRING
      },
      ibge_cod_state:  { 
        type: Sequelize.STRING
      },
      cellphone: 	{ 
        type: Sequelize.STRING
      },    
      cellphone2: { 
        type: Sequelize.STRING
      },
      phone: 	{ 
        type: Sequelize.STRING
      },
      cellphone_contact: { 
        type: Sequelize.STRING
      },
      phone_contact:  { 
        type: Sequelize.STRING
      },
      responsible_contact: { 
        type: Sequelize.STRING
      },
      email1: { 
        type: Sequelize.STRING
      },
      email2: { 
        type: Sequelize.STRING
      },
      email3: { 
        type: Sequelize.STRING
      },
      active: { 
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customers');
  }
};