'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_pjs', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        index: true
      },
      customer_uuid: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'uuid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      cnpj: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      ie: {
        type: Sequelize.STRING
      },
      im: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('customer_pjs', ['customer_uuid']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_pjs');
  }
};