const Sequelize = require('sequelize');
const sequelize = require('../db.js');

class Repo_star extends Sequelize.Model {}
Repo_star.init({
  repo_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
}, {sequelize, modelName: "repo_star"});

module.exports = Repo_star;