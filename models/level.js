module.exports = (sequelize, Sequelize, DataTypes) => {
  const Level = sequelize.define("Level", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Level;
};
