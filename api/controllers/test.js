const BaseController = require("../../base/controller");
const TestService = require("../../services/test");

class TestController extends BaseController {
  constructor() {
    super();
    this._mainService = new TestService();
  }
}

module.exports = TestController;
