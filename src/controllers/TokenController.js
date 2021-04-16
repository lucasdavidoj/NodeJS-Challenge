const Token = require('../database/models/Token');

module.exports = {
  async list(req, res){
    try {
      const tokens = await Token.findAll()
      return res.json(tokens);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },
}