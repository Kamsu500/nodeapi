'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Taches',{
      fields: ['id_user'],
      type: 'foreign Key',
      name:"tache_user",
      references:{
        table:'Users',
        field:'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Taches',{
      fields: ['id_user'],
      type: 'foreign Key',
      name:"tache_user",
      references:{
        table:'Users',
        field:'id'
      }
    })
  }
};
