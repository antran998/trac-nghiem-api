const BaseService = require("../base/service");
const { QuestionLevels } = require("../ulti/constant");

class TestService extends BaseService {
  constructor() {
    super();
    this._model = this._db.test;
    this._Op = this._db.Sequelize.Op;
  }

  getAllWithFilter = async ({
    search,
    limit,
    offset,
    order,
    direction,
    subjectId,
    levelId,
    userId,
  }) => {
    if (!search) search = "";
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    if (!order) order = "id";
    if (!direction) direction = "DESC";

    const pagination = {
      order: [[order, direction]],
      limit: +limit,
      offset: +offset,
    };
    const filters = [];
    for (const key in this._model.rawAttributes) {
      filters.push({
        [key]: { [this._Op.substring]: search },
      });
    }

    const idFilter = [];
    if (subjectId) idFilter.push({ "$subject.id$": subjectId });
    if (levelId) idFilter.push({ "$level.id$": levelId });
    if (userId) idFilter.push({ "$user.id$": userId });

    if (idFilter.length > 0) {
      pagination.where = {
        [this._Op.and]: [{ [this._Op.or]: filters }, ...idFilter],
      };
    } else pagination.where = { [this._Op.or]: filters };
    return await this._model.findAndCountAll({
      ...pagination,
      include: [
        { model: this._db.subject, as: "subject" },
        { model: this._db.level, as: "level" },
        { model: this._db.user, as: "user" },
      ],
    });
  };
  getQuestionRequested = (
    categoryIds,
    levels,
    amount,
    limitUnderstand,
    limitUse,
    limitMaster
  ) => {
    const questionRequested = [];
    const totalQuestInCate = Math.floor(amount / categoryIds.length);
    let leftOver = amount - totalQuestInCate * categoryIds.length;

    const arrangedLevels = [];
    arrangedLevels.push(
      levels.find((item) => item.name === QuestionLevels.understand)
    );
    arrangedLevels.push(
      levels.find((item) => item.name === QuestionLevels.use)
    );
    arrangedLevels.push(
      levels.find((item) => item.name === QuestionLevels.master)
    );
    arrangedLevels.push(
      levels.find((item) => item.name === QuestionLevels.observe)
    );

    for (const cateId of categoryIds) {
      const limits = [];
      let tempTotal = totalQuestInCate;
      if (leftOver > 0) {
        tempTotal += 1;
        leftOver--;
      }

      for (const item of arrangedLevels) {
        if (item.name === QuestionLevels.understand) {
          limits.push(Math.round(limitUnderstand * tempTotal));
        } else if (item.name === QuestionLevels.use) {
          limits.push(Math.round(limitUse * tempTotal));
        } else if (item.name === QuestionLevels.master) {
          limits.push(Math.round(limitMaster * tempTotal));
        } else {
          limits.push(
            tempTotal - limits.reduce((total, number) => total + number, 0)
          );
        }

        const last = limits.length - 1;
        questionRequested.push({
          cateId: cateId,
          id: item.id,
          last: limits[last],
        });
      }
    }

    return questionRequested;
  };
}

module.exports = TestService;
