const BaseController = require("../../base/controller");
const TestDetailService = require("../../services/testDetail");

class TestDetailController extends BaseController {
  constructor() {
    super();
    this._mainService = new TestDetailService();
  }
}

module.exports = TestDetailController;
