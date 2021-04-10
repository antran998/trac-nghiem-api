const BaseController = require("../../base/controller");
const QuestionService = require("../../services/question");

class QuestionController extends BaseController {
  constructor() {
    super();
    this._mainService = new QuestionService();
  }
}

module.exports = QuestionController;
