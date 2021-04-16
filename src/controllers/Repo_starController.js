const Repo_star = require('../database/models/Repo_star');

module.exports = {
  async list(req, res){
    try {
      const repo_stars = await Repo_star.findAll()
      return res.json(repo_stars);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async show(req, res){
    try {
      const repo_star = await Repo_star.findAll({where: {id: req.params.id}});
      return res.json(repo_star);
    } catch (err) {
      return console.err("Erro na busca: ", err);
    }
  },

  async create(req, res){
    const { repo_id, user_id } = req.body;
    try {
      const repo_star = await Repo_star.create({repo_id, user_id});
      return res.json(repo_star);
    } catch (error) {
      return console.error('Erro na criação', error);
    }
  },

  async update(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    const { repo_id, user_id } = req.body;
    const id = req.params.id;
    try {
      await Repo_star.update({ repo_id, user_id }, {where: {id: {[Op.eq]: id }}});
      return res.json({msg: `Repo_star atualizado com sucesso!`});
    } catch (error) {
      return res.json({msg: `Repo_star não foi atualizado`}, error);            
    }
  },

  async delete(req, res){
    try {
      await Repo_star.destroy({where: {id: req.params.id }});
      return res.json({msg: `Exclusão do item feita com sucesso!`});
    } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }
  },
}