const BaseController = require("../../base/controller");
const FeedbackService = require("../../services/feedback");

class FeedbackController extends BaseController {
  constructor() {
    super();
    this._mainService = new FeedbackService();
  }
}

module.exports = FeedbackController;
