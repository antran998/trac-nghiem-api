const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.host,
    dialect: config.db.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      deletedAt: true,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category")(sequelize, Sequelize, DataTypes);
db.user = require("./user")(sequelize, Sequelize, DataTypes);
db.role = require("./role")(sequelize, Sequelize, DataTypes);
db.question = require("./question")(sequelize, Sequelize, DataTypes);
db.answer = require("./answer")(sequelize, Sequelize, DataTypes);
db.level = require("./level")(sequelize, Sequelize, DataTypes);
db.test = require("./test")(sequelize, Sequelize, DataTypes);
db.testDetail = require("./testDetail")(sequelize, Sequelize, DataTypes);
db.feedback = require("./feedback")(sequelize, Sequelize, DataTypes);
db.subject = require("./subject")(sequelize, Sequelize, DataTypes);

// Subject Association
db.subject.hasMany(db.category, { foreignKey: "subjectId" });
// Role Association
db.role.hasMany(db.user, { foreignKey: "roleId" });
// User Association
db.user.belongsTo(db.role, { foreignKey: "roleId" });
db.user.hasMany(db.feedback, { foreignKey: "userId" });
db.user.hasMany(db.test, { foreignKey: "userId" });
// Category Association
db.category.hasMany(db.question, { foreignKey: "cateId" });
db.category.belongsTo(db.subject, { foreignKey: "subjectId" });
// Question Association
db.question.hasMany(db.answer, { foreignKey: "questionId" });
db.question.belongsTo(db.level, { foreignKey: "levelId" });
db.question.belongsTo(db.category, { foreignKey: "cateId" });
// Answer Association
db.answer.belongsTo(db.question, { foreignKey: "questionId" });
// Level Association
db.level.hasMany(db.question, { foreignKey: "levelId" });
db.level.hasMany(db.test, { foreignKey: "levelId" });
// Test Association
db.test.belongsTo(db.level, { foreignKey: "levelId" });
db.test.hasMany(db.testDetail, { foreignKey: "testId" });
db.test.belongsTo(db.user, { foreignKey: "userId" });
// Test Detail Association
db.testDetail.belongsTo(db.test, { foreignKey: "testId" });
// Feedback Association
db.feedback.belongsTo(db.user, { foreignKey: "userId" });

module.exports = db;
