const BaseService = require("../base/service");

class FeedbackService extends BaseService {
  constructor() {
    super();
    this._model = this._db.feedback;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = FeedbackService;
