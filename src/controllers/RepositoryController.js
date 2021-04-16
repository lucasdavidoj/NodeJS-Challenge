const Repository = require('../database/models/Repository');
const Repo_star = require('../database/models/Repo_star');

module.exports = {
  async list(req, res){
    try {
      const repositories = await Repository.findAll()
      return res.json(repositories);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async show(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    slug = req.params.username + "%";
    try {
      const repository = await Repository.findAll({where: {slug: {[Op.like]: slug }}});
      const count_repo = Object.keys(repository).length;
      let repo = []; 
      for (let i in repository) {
        let repo_star = await Repo_star.findAll({where: {repo_id: {[Op.eq]: repository[i].id }}});
        let star_count = Object.keys(repo_star).length;
        repo.push({
          name: repository[i].name, 
          description: repository[i].description, 
          public:repository[i].public, 
          slug: repository[i].slug,
          stars: star_count   
        })
      }; 
      repo_count = Object.keys(repository).length;
      const data = { data: repo, count: repo_count }
      return res.json(data);
    } catch (error) {
      return console.error("Erro na busca: ", error);
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