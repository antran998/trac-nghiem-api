const db = require("../models");
const categorySeeding = require("./category");
const userSeeding = require("./user");
const roleSeeding = require("./role");
const levelSeeding = require("./level");

const announce = (model) => console.log(`---- Seed ${model} complete ----`);

const databaseSeeding = () => {
  categorySeeding(db).then(() => announce("category"));
  roleSeeding(db).then(() =>
    userSeeding(db).then(() => announce("user & role"))
  );
  levelSeeding(db).then(() => announce("level"));
};

module.exports = databaseSeeding;
