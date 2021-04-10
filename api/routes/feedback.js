const { Router } = require("express");
const { isAuth } = require("../../middleware");
const FeedbackController = require("../controllers/feedback");

const route = Router();

const feedbackRoutes = (app, baseRoutes) => {
  const controller = new FeedbackController();
  app.use("/feedback", route);

  baseRoutes(controller, route, "ignoreGet");
};

module.exports = feedbackRoutes;
