module.exports = (sequelize, Sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    questionAmount: {
      type: DataTypes.FLOAT,
    },
    time: {
      type: DataTypes.FLOAT,
    },
    correctCount: {
      type: DataTypes.FLOAT,
    },
    wrongCount: {
      type: DataTypes.FLOAT,
    },
    totalPoint: {
      type: DataTypes.FLOAT,
    },
  });
  return Test;
};
