const levelSeeding = (db) => {
  return db.level.bulkCreate([
    { name: "Dễ" },
    { name: "Trung bình" },
    { name: "Khó" },
  ]);
};

module.exports = levelSeeding;
