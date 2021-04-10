const { Router } = require("express");
const { isAuth } = require("../../middleware");
const UserController = require("../controllers/user");

const route = Router();

const userRoutes = (app, baseRoutes) => {
  const controller = new UserController();
  app.use("/user", route);

  baseRoutes(controller, route, "ignoreGet");
};

module.exports = userRoutes;
