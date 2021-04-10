module.exports = (sequelize, Sequelize, DataTypes) => {
  const TestDetail = sequelize.define("TestDetail", {
    point: {
      type: DataTypes.FLOAT,
    },
  });
  return TestDetail;
};
