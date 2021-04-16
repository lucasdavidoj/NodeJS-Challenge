const Sequelize = require('sequelize');
const sequelize = require('../db.js');

class Token extends Sequelize.Model {}
Token.init({
  user_id: Sequelize.INTEGER,
  req_date: Sequelize.DATE,
}, {sequelize, modelName: "token"});

module.exports = Token;