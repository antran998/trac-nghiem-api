const { QueryTypes } = require("sequelize");
const BaseService = require("../base/service");

class FeedbackService extends BaseService {
  constructor() {
    super();
    this._model = this._db.feedback;
    this._Op = this._db.Sequelize.Op;
    this._sequelize = this._db.sequelize;
  }
  getOne = async (query) => {
    const filter = {};
    for (const key in query) filter[key] = query[key];
    return await this._model.findOne({
      where: filter,
      include: [
        {
          model: this._db.user,
          as: "user",
          attributes: ["email", "name", "phone"],
        },
      ],
    });
  };
  getAll = async ({ search, limit, offset, order, direction }) => {
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
    pagination.where = { [this._Op.or]: filters };
    return await this._model.findAndCountAll({
      ...pagination,
      include: [
        {
          model: this._db.user,
          as: "user",
          attributes: ["email", "name", "phone"],
        },
      ],
    });
  };
  getAvgRating = () => {
    return this._sequelize.query("select avg(rate) as avgRate from feedback", {
      type: QueryTypes.SELECT,
    });
  };
  getRatingAmount = (rate) => {
    return this._sequelize.query(
      "SELECT sum(rate) as amount FROM final.feedback where rate = ?",
      {
        replacements: [rate],
        type: QueryTypes.SELECT,
      }
    );
  };
}

module.exports = FeedbackService;
