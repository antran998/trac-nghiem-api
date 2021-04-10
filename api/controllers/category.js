const BaseController = require("../../base/controller");
const CategoryService = require("../../services/category");

class CategoryController extends BaseController {
  constructor() {
    super();
    this._mainService = new CategoryService();
  }
}

module.exports = CategoryController;
