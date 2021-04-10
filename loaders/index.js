const expressLoader = require("./express");
const sequelizeLoader = require("./sequelize");

const loaders = async (expressApp) => {
  await expressLoader(expressApp);
  console.log("Express connected !");

  await sequelizeLoader();
  console.log("Database connected");
};

module.exports = loaders;
