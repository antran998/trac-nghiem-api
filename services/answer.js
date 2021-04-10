const BaseService = require("../base/service");

class AnswerService extends BaseService {
  constructor() {
    super();
    this._model = this._db.answer;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = AnswerService;
