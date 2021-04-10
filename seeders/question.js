const questionSeeding = (db) => {
  return db.question.bulkCreate([
    { content: "1. Câu hỏi 1", cateId: 1, levelId: 1 },
  ]);
};

module.exports = questionSeeding;
