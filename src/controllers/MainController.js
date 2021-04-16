const Repository = require('../database/models/Repository');
const User = require('../database/models/User');
const Follow = require('../database/models/Follow');
const Token = require('../database/models/Token');

module.exports = {
  async show(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    try {
      const user = await User.findAll({where: {username: req.params.username}, raw: true});
      const slug = user['0'].username + '%';
      const id = user['0'].id;
      const req_date = Date.now()
      const repository = await Repository.findAll({where: {slug: {[Op.like]: slug }}});
      const follower = await Follow.findAll({where: {follower_id: {[Op.eq]: id }}});
      const following = await Follow.findAll({where: {following_id: {[Op.eq]: id }}});
      const count_follower = Object.keys(follower).length;
      const count_following = Object.keys(following).length;
      const repo_count = Object.keys(repository).length;
      const data = { user: user, repo_count: repo_count, follower: count_follower, following: count_following }
      const token = await Token.create({ user_id: id, req_date: req_date });
      return res.json(data); 
    } catch (err) {
      return console.error("Erro na busca: ", err);
    }
  },

  async list(req, res){
    try {
      const repositories = await Repository.findAll()
      return res.json(repositories);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async create(req, res){
    const { username, name, description, public } = req.body;
    const slug = username + '/' + name;
    try {
      const repository = await Repository.create({name, description, public, slug});
      return res.json(repository);
    } catch (error) {
      return console.error('Erro na criação', error);
    }
  },

  async update(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    const { name, description, public, slug } = req.body;
    const id = req.params.id;
    try {
      await Repository.update({ name, description, public, slug }, {where: {id: {[Op.eq]: id }}});
      return res.json({msg: `Follow atualizado com sucesso!`});
    } catch (error) {
      return res.json({msg: `Follow não foi atualizado`}, error);            
    }
  },

  async delete(req, res){
    try {
      await Repository.destroy({where: {id: req.params.id }});
      return res.json({msg: `Exclusão de item feita com sucesso!`});
    } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }
  },
}