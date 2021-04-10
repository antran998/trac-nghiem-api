const categorySeeding = (db) => {
  return db.category.bulkCreate([
    { name: "Chương 1" },
    { name: "Chương 2" },
    { name: "Chương 3" },
  ]);
};

module.exports = categorySeeding;
