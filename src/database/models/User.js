const Sequelize = require('sequelize');
const sequelize = require('../db.js');

class User extends Sequelize.Model {}
User.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  location: Sequelize.STRING,
  avatar: Sequelize.STRING,
  username: Sequelize.STRING,
  bio: Sequelize.TEXT
}, {sequelize, modelName: "user"});

module.exports = User;