module.exports = (sequelize, Sequelize, DataTypes) => {
  const Result = sequelize.define("Result", {
    data: {
      type: DataTypes.TEXT,
    },
  });
  return Result;
};
