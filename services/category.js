const BaseService = require("../base/service");

class CategoryService extends BaseService {
  constructor() {
    super();
    this._model = this._db.category;
    this._Op = this._db.Sequelize.Op;
  }
}

module.exports = CategoryService;
