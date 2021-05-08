const answerSeeding = (db) => {
  return db.answer.bulkCreate([
    { content: "Thêm AgNO3 vào dung dịch Fe(NO3)2.", isCorrect: false, questionId: 1 },
    { content: "Cho kim loại Fe vào dung dịch HCl đặc, nguội.", isCorrect: false, questionId: 1 },
    { content: " Cho kim loại Al vào dung dịch NaOH.", isCorrect: true, questionId: 1 },
    { content: "Cho Fe tác dụng với dung dịch ZnCl2.", isCorrect: false, questionId: 1 },


    { content: "nước", isCorrect: false, questionId: 2},
    { content: "giấm", isCorrect: true, questionId: 2},
    { content: "nước muối", isCorrect: false, questionId: 2},
    { content: "nước vôi trong", isCorrect: false, questionId: 2 },
    

    { content: "HCl", isCorrect: false, questionId: 3},
    { content: "NaOH", isCorrect: true, questionId: 3},
    { content: "NaCl", isCorrect: false, questionId: 3},
    { content: "KNO3", isCorrect: false, questionId: 3},



    { content: "Fe2O3", isCorrect: false, questionId: 4},
    { content: "FeCl3", isCorrect: false, questionId: 4},
    { content: "Fe(NO3)2", isCorrect: true, questionId: 4},
    { content: "Fe2(SO4)3", isCorrect: false, questionId: 4},


    
  ]);
};

module.exports = answerSeeding;
