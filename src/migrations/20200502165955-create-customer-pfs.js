'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_pfs', {
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
      cpf: {
        type: Sequelize.STRING
      },
      rg: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE
      },
      nacionality: {
        type: Sequelize.STRING
      },
      martial_status: {
        type: Sequelize.ENUM,
        values: ['single','married','death']
      },
      profission: {
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
    .then(() => queryInterface.addIndex('customer_pfs', ['customer_uuid']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_pfs');
  }
};