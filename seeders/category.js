const categorySeeding = (db) => {
  return db.category.bulkCreate([
    { name: "Chương 1", subjectId: 1 },
    { name: "Chương 2", subjectId: 1 },
    { name: "Chương 3", subjectId: 1 },
  ]);
};

module.exports = categorySeeding;
