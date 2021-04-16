const Sequelize = require('sequelize');
const sequelize = require('../db.js');

class Repository extends Sequelize.Model {}
Repository.init({
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  public: Sequelize.STRING,
  slug: Sequelize.STRING,
}, {sequelize, modelName: "repository"});

module.exports = Repository;