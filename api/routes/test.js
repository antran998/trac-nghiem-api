const { Router } = require("express");
const { isAuth } = require("../../middleware");
const TestController = require("../controllers/test");

const route = Router();

const testRoutes = (app, baseRoutes) => {
  const controller = new TestController();
  app.use("/test", route);

  baseRoutes(controller, route, "ignoreGet");
  route.get("/result", controller.getTestResult);
};

module.exports = testRoutes;
