const { Router } = require("express");
const { isAuth } = require("../../middleware");
const TestDetailController = require("../controllers/testDetail");

const route = Router();

const testDetailRoutes = (app, baseRoutes) => {
  const controller = new TestDetailController();
  app.use("/testDetail", route);

  baseRoutes(controller, route, "ignoreGet");
};

module.exports = testDetailRoutes;
