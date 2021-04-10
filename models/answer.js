module.exports = (sequelize, Sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    content: {
      type: DataTypes.STRING,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Answer;
};
