module.exports = (sequelize, Sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    time: {
      type: DataTypes.FLOAT,
    },
    finishTime: {
      type: DataTypes.FLOAT,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    correctAmount: {
      type: DataTypes.FLOAT,
    },
    wrongAmount: {
      type: DataTypes.FLOAT,
    },
    eachPoint: {
      type: DataTypes.FLOAT,
    },
    finishPoint: {
      type: DataTypes.FLOAT,
    },
    totalPoint: {
      type: DataTypes.FLOAT,
    },
    categoryIds: {
      type: DataTypes.TEXT,
    },
    questionIds: {
      type: DataTypes.TEXT,
    },
    answerIds: {
      type: DataTypes.TEXT,
    },
  });
  return Test;
};
