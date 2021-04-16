const User = require('../database/models/User');

module.exports = {
  async create(req, res){
    const { name, email, location, avatar, username, bio } = req.body;
    try {
      const user = await User.create({name, email, location, avatar, username, bio});
      return res.json(user);
    } catch (error) {
      return console.error('Erro na criação', error);
    }
  },

  async list(req, res){
    try {
      const users = await User.findAll()
      return res.json(users);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async show(req, res){
    try {
      const user = await User.findAll({where: {id: req.params.id}});
      return res.json(user);
    } catch (err) {
      return console.err("Erro na busca: ", err);
    }
  },

  async update(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    const { name, email, location, avatar, username, bio } = req.body;
    const id = req.params.id;
    try {
      await User.update({ name, email, location, avatar, username, bio }, {where: {id: {[Op.eq]: id }}});
      return res.json({msg: `User ${name} atualizado com sucesso!`});
    } catch (error) {
      return res.json({msg: `User ${name} não foi atualizado`}, error);            
    }
  },

  async delete(req, res){
    try {
      await User.destroy({where: {id: req.params.id }});
      return res.json({msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
    } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }
  },
}