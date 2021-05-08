const subjectSeeding = (db) => {
  return db.subject.bulkCreate([
    {name: "Toán" },
    {name: "Lý" },
    {name: "Hóa" },
    {name: "Sinh"},
    {name: "Tiếng Anh"},
    {name: "Giáo dục công dân"},
    {name: "Sử"},
    {name: "Địa"},
    {name: "Công Nghệ"},
    {name: "Tin Học"},
  ]);
};

module.exports = subjectSeeding;
