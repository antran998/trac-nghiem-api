const BaseService = require("../base/service");

class QuestionService extends BaseService {
  constructor() {
    super();
    this._model = this._db.question;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = QuestionService;
