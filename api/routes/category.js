const { Router } = require("express");
const { isAuth } = require("../../middleware");
const CategoryController = require("../controllers/category");

const route = Router();

const categoryRoutes = (app, baseRoutes) => {
  const controller = new CategoryController();
  app.use("/category", route);

  // baseRoutes(controller, route, "ignoreGet");
  route.get("/", controller.getAll);
  route.get("/one", controller.getOne);
  route.post("/", isAuth, controller.create);
  route.put("/", isAuth, controller.update);
  route.delete("/:id", isAuth, controller.delete);
};

module.exports = categoryRoutes;
