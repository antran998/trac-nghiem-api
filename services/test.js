const BaseService = require("../base/service");

class TestService extends BaseService {
  constructor() {
    super();
    this._model = this._db.test;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = TestService;
