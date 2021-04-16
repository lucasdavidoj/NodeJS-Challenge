const Sequelize = require('sequelize');
const sequelize = require('../db.js');

class Follow extends Sequelize.Model {}
Follow.init({
  follower_id: Sequelize.INTEGER,
  following_id: Sequelize.INTEGER,
}, {sequelize, modelName: "follow"});

module.exports = Follow;