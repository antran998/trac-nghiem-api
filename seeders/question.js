const questionSeeding = (db) => {
  return db.question.bulkCreate([
    {
      content: "1.  Thí nghiệm nào dưới đây không xảy ra phản ứng? ",
      cateId: 1,
      levelId: 1,
    },
    {
      content:
        "2.  Để khử mùi tanh của cá (gây ra do một số amin) ta có thể rửa cá với",
      cateId: 2,
      levelId: 1,
    },
    {
      content:
        "3.Kết tủa Fe(OH)2 sinh ra khi cho dung dịch FeCl2 tác dụng với dung dịch",
      cateId: 3,
      levelId: 1,
    },
    {
      content: "4.Sắt có số oxi hóa +2 trong hợp chất nào sau đây?",
      cateId: 4,
      levelId: 1,
    },
    {
      content: "Câu hỏi 5",
      cateId: 3,
      levelId: 1,
    },
    {
      content: "Câu hỏi 6",
      cateId: 2,
      levelId: 1,
    },
    {
      content: "Câu hỏi 7",
      cateId: 1,
      levelId: 1,
    },
    {
      content: "Câu hỏi 8",
      cateId: 3,
      levelId: 1,
    },
    {
      content: "Câu hỏi 9",
      cateId: 4,
      levelId: 1,
    },
    {
      content: "Câu hỏi 10",
      cateId: 1,
      levelId: 1,
    },
  ]);
};

module.exports = questionSeeding;
