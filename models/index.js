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
db.feedback = require("./feedback")(sequelize, Sequelize, DataTypes);
db.subject = require("./subject")(sequelize, Sequelize, DataTypes);

// Subject Association
db.subject.hasMany(db.category, { foreignKey: "subjectId", as: "categories" });
db.subject.hasMany(db.test, { foreignKey: "subjectId", as: "tests" });
// Role Association
db.role.hasMany(db.user, { foreignKey: "roleId", as: "users" });
// User Association
db.user.belongsTo(db.role, { foreignKey: "roleId", as: "role" });
db.user.hasMany(db.feedback, { foreignKey: "userId", as: "feedbacks" });
db.user.hasMany(db.test, { foreignKey: "userId", as: "tests" });
// Category Association
db.category.hasMany(db.question, { foreignKey: "cateId", as: "questions" });
db.category.belongsTo(db.subject, { foreignKey: "subjectId", as: "subject" });
// Question Association
db.question.hasMany(db.answer, { foreignKey: "questionId", as: "answers" });
db.question.belongsTo(db.level, { foreignKey: "levelId", as: "level" });
db.question.belongsTo(db.category, { foreignKey: "cateId", as: "category" });
// Answer Association
db.answer.belongsTo(db.question, { foreignKey: "questionId", as: "question" });
// Level Association
db.level.hasMany(db.question, { foreignKey: "levelId", as: "questions" });
// Test Association
db.test.belongsTo(db.user, { foreignKey: "userId", as: "user" });
db.test.belongsTo(db.subject, { foreignKey: "subjectId", as: "subject" });
// Feedback Association
db.feedback.belongsTo(db.user, { foreignKey: "userId", as: "user" });

module.exports = db;
