const answerSeeding = (db) => {
  return db.answer.bulkCreate([
    { content: "Câu trả lời 1", isCorrect: false, questionId: 1 },
  ]);
};

module.exports = answerSeeding;
