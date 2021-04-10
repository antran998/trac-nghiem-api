const db = require("../models");

class BaseService {
  _model;
  _Op;

  constructor() {
    this._db = db;
  }

  getOne = async (query) => {
    const filter = {};
    for (const key in query) filter[key] = query[key];
    return await this._model.findOne({ where: filter });
  };
  getAll = async ({
    search = "",
    limit = 10,
    offset = 0,
    order = "createdAt",
    direction = "DESC",
  }) => {
    const pagination = {
      order: [[order, direction]],
      limit: +limit,
      offset: +offset,
    };
    const filters = [];
    for (const key in this._model.rawAttributes) {
      if (key.includes("At")) {
        filters.push(
          this._db.sequelize.where(
            this._db.sequelize.col(key),
            "like",
            "%" + search + "%"
          )
        );
      } else {
        filters.push({
          [key]: { [this._Op.like]: "%" + search + "%" },
        });
      }
    }
    pagination.where = { [this._Op.or]: filters };
    return await this._model.findAndCountAll(pagination);
  };
  create = async (properties) => {
    return await this._model.create(properties);
  };
  update = async (properties) => {
    return await this._model.update(properties, {
      where: { id: properties.id },
    });
  };
  delete = async (id) => {
    return await this._model.destroy({
      where: { id },
      force: true,
    });
  };
}

module.exports = BaseService;
