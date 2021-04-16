const Follow = require('../database/models/Follow');
const User = require('../database/models/User');

module.exports = {
  async list(req, res){
    try {
      const follows = await Follow.findAll()
      return res.json(follows);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async show(req, res){
    try {
      const follow = await Follow.findAll({where: {id: req.params.id}});
      return res.json(follow);
    } catch (err) {
      return console.err("Erro na busca: ", err);
    }
  },

  async showFollower(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    nameuser = req.params.username;
    try {
      const user = await User.findAll({where: {username: {[Op.eq]: nameuser }}, raw: true});
      const id = user["0"].id; 
      const follower = await Follow.findAll({where: {follower_id: {[Op.eq]: id }}, raw: true});
      const follower_count = Object.keys(follower).length;
      let repo = [];
      for (let i in follower) {
        console.log(follower[1]["following_id"]);
        let follow_id = follower[i]["following_id"];
        let users = await User.findAll({where: {id: follow_id}, raw: true});
        repo.push({
          avatar: users['0'].avatar, 
          username: users['0'].username  
        })
      };
      const data = { data: repo, count: follower_count};
      return res.json(data);
    } catch (error) {
      return console.error("Erro na busca: ", error);
    }
  },

  async showFollowing(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    try {
      const user = await User.findAll({where: {username: req.params.username}, raw: true});
      const id = user["0"].id; 
      const following = await Follow.findAll({where: {following_id: {[Op.eq]: id }}, raw: true});
      let repo = [];
      for (let i in following) {
        let users = await User.findAll({where: {id: {[Op.eq]: following[i].follower_id}}});
        repo.push({
          username: users['0'].username, 
          avatar: users['0'].avatar, 
        })
      };
      const following_count = Object.keys(following).length;
      const data = { data: repo, count: following_count};
      return res.json(data);
    } catch (error) {
      return console.error("Erro na busca: ", error);
    }
  },

  async create(req, res){
    const { follower_id, following_id } = req.body;
    try {
      const follow = await Follow.create({follower_id, following_id});
      return res.json(follow);
    } catch (error) {
      return console.error('Erro na criação', error);
    }
  },

  async update(req, res){
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op
    const { follower_id, following_id } = req.body;
    const id = req.params.id;
    try {
      await Follow.update({ follower_id, following_id }, {where: {id: {[Op.eq]: id }}});
      return res.json({msg: `Follow atualizado com sucesso!`});
    } catch (error) {
      return res.json({msg: `Follow não foi atualizado`}, error);            
    }
  },

  async delete(req, res){
    try {
      await Follow.destroy({where: {id: req.params.id }});
      return res.json({msg: `Exclusão de item feita com sucesso!`});
    } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }
  },
}