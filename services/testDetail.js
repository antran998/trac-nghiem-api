const BaseService = require("../base/service");

class TestDetailService extends BaseService {
  constructor() {
    super();
    this._model = this._db.testDetail;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = TestDetailService;
