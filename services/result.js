const BaseService = require("../base/service");
const { QueryTypes } = require("sequelize");

class ResultService extends BaseService {
  constructor() {
    super();
    this._model = this._db.result;
    this._Op = this._db.Sequelize.Op;
    this._sequelize = this._db.sequelize;
  }

  getListByTest = (testIds) => {
    return this._model.findAll({
      where: {
        testId: {
          [this._Op.in]: testIds,
        },
      },
    });
  };
  getGoodAverageResult = () => {
    return this._sequelize.query(
      `
      SELECT name, userId, avg(correctPercent) as avgPercent 
      FROM final.result inner join final.user on userId = final.user.id
      where (select avg(correctPercent) from final.result) >= 50
      group by userId
      order by avgPercent DESC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
  };
  getAverageResultBySubjects = (subjectId) => {
    return this._sequelize.query(
      `
      SELECT name, userId, avg(correctPercent) as avgPercent 
      FROM final.result inner join final.user on userId = final.user.id
      where subjectId = ?
      group by userId;
      `,
      {
        replacements: [subjectId],
        type: QueryTypes.SELECT,
      }
    );
  };
}

module.exports = ResultService;
