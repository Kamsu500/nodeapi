'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Taches',{
      fields: ['userId '],
      type: 'foreign Key',
      name:"tache_user",
      references:{
        table:'Users',
        field:'userId'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Tache',{
      fields: ['userId '],
      type: 'foreign Key',
      name:"tache_user",
      references:{
        table:'Users',
        field:'userId'
      }
    })
  }
};
