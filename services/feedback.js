const { QueryTypes } = require("sequelize");
const BaseService = require("../base/service");

class FeedbackService extends BaseService {
  constructor() {
    super();
    this._model = this._db.feedback;
    this._Op = this._db.Sequelize.Op;
    this._sequelize = this._db.sequelize;
  }
  getAvgRating = () => {
    return this._sequelize.query("select avg(rate) as avgRate from feedback", {
      type: QueryTypes.SELECT,
    });
  };
  getRatingAmount = (rate) => {
    return this._sequelize.query(
      "SELECT sum(rate) as amount FROM final.feedback where rate = ?",
      {
        replacements: [rate],
        type: QueryTypes.SELECT,
      }
    );
  };
}

module.exports = FeedbackService;
