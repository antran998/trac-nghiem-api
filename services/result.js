const BaseService = require("../base/service");

class ResultService extends BaseService {
  constructor() {
    super();
    this._model = this._db.result;
    this._Op = this._db.Sequelize.Op;
  }

  getListByTest = (testIds) => {
    return this._model.findAll({
      where: {
        testId: {
          [this._Op.in]: testIds,
        },
      },
    });
  };
}

module.exports = ResultService;
