const BaseService = require("../base/service");

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
}

module.exports = TestService;
