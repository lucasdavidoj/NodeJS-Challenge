'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', {
      'name': 'Pedro', 
      'email': 'Pedro@gmail.com', 
      'location': 'Cajamar, São Paulo', 
      'avatar': 'None', 
      'username': 'Pedro', 
      'bio': 'Estudante de engenharia da computação'
    }, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
