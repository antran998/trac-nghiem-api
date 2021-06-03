const BaseController = require("../../base/controller");
const ResultService = require("../../services/result");
const RoleService = require("../../services/role");
const TestService = require("../../services/test");
const UserService = require("../../services/user");

class CategoryController extends BaseController {
  constructor() {
    super();
    this._mainService = new UserService();
    this._roleService = new RoleService();
    this._testService = new TestService();
    this._resultService = new ResultService();
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existedUser = await this._mainService.getOne({ email });
      if (!existedUser) return this.error(res, 422, "Email hoặc mật khẩu sai");
      const checkPassword = await this._mainService.checkPassword(
        password,
        existedUser.password
      );
      if (!checkPassword)
        return this.error(res, 422, "Email hoặc mật khẩu sai");
      const role = await this._roleService.getOne({ id: existedUser.roleId });
      const payload = {
        id: existedUser.id,
        email: existedUser.email,
        name: existedUser.name,
        phone: existedUser.phone,
        roleId: existedUser.roleId,
        role: role.name,
      };
      const token = this._mainService.generateToken(payload);
      this.ok(res, { token });
    } catch (error) {
      next(error);
    }
  };

  signup = async (req, res, next) => {
    try {
      const { email, phone, password, name } = req.body;
      const existedUser = await this._mainService.getOne({ email });
      if (existedUser) return this.error(res, 422, "Email đã tồn tại");
      const hashPassword = await this._mainService.generatePassword(password);
      const role = await this._roleService.getOne({ name: "user" });
      const newUser = {
        email,
        phone,
        name,
        password: hashPassword,
        roleId: role.id,
      };
      const createdUser = await this._mainService.create(newUser);
      const payload = { ...newUser, role: role.name, id: createdUser.id };
      delete payload.password;
      const token = this._mainService.generateToken(payload);
      return this.ok(res, { token });
    } catch (error) {
      return next(error);
    }
  };
  getUsersWithHighestTest = async (req, res, next) => {
    try {
      const users = await this._testService.getHighestTestByUsers();
      return this.ok(res, users);
    } catch (error) {
      return next(error);
    }
  };
  getUserWithGoodTest = async (req, res, next) => {
    try {
      const users = await this._resultService.getGoodAverageResult();
      return this.ok(res, users);
    } catch (error) {
      return next(error);
    }
  };
  getUserWithSubjectResult = async (req, res, next) => {
    try {
      const { subjectId } = req.query;
      const users = await this._resultService.getAverageResultBySubjects(
        subjectId
      );
      return this.ok(res, users);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = CategoryController;
