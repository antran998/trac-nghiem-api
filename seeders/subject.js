const subjectSeeding = (db) => {
  return db.subject.bulkCreate([
    { name: "Toán" },
    { name: "Lý" },
    { name: "Hóa" },
  ]);
};

module.exports = subjectSeeding;
