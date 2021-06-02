const BaseController = require("../../base/controller");
const AnswerService = require("../../services/answer");
const TestService = require("../../services/test");
const CategoryService = require("../../services/category");
const QuestionService = require("../../services/question");
const LevelService = require("../../services/level");
const ResultService = require("../../services/result");
const { TestLevels, QuestionLevels } = require("../../ulti/constant");

class TestController extends BaseController {
  constructor() {
    super();
    this._mainService = new TestService();
    this._answerService = new AnswerService();
    this._categoryService = new CategoryService();
    this._questionService = new QuestionService();
    this._levelService = new LevelService();
    this._testService = new TestService();
    this._resultService = new ResultService();
  }

  create = async (req, res, next) => {
    try {
      const { categoryIds, time, amount, subjectId, userId, level } = req.body;

      const levels = await this._levelService.getAll({ direction: "ASC" });

      let questionRequested = [];
      if (level === TestLevels.easy) {
        questionRequested = this._testService.getQuestionRequested(
          categoryIds,
          levels.rows,
          amount,
          0.3,
          0.2,
          0.1
        );
      } else {
        questionRequested = this._testService.getQuestionRequested(
          categoryIds,
          levels.rows,
          amount,
          0.2,
          0.3,
          0.2
        );
      }

      const questionPromises = questionRequested.map((item) => {
        return this._questionService.getListRandomWithCategory(
          item.cateId,
          item.id,
          item.last
        );
      });

      const questionResults = await Promise.all(questionPromises);
      let finalQuestions = [];
      for (const questions of questionResults)
        finalQuestions = finalQuestions.concat(questions);

      const questionIds = finalQuestions.map((item) => item.id);
      const answerIds = [];
      for (let i = 0; i < questionIds.length; i++) answerIds.push(-1);
      const newTest = await this._testService.create({
        time,
        amount,
        categoryIds: categoryIds.join(","),
        questionIds: questionIds.join(","),
        answerIds: answerIds.join(","),
        subjectId,
        userId,
        level,
      });

      return this.created(res, newTest);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id, answerIds } = req.body;

      await this._mainService.update({ answerIds: answerIds.join(","), id });

      const test = await this._mainService.getOne({ id });
      if (!test) throw { status: 422, message: "Invalid test" };

      let categories = [];
      let questions = [];

      const cateIds = test.categoryIds.split(",");
      if (test.cateIds !== "") {
        categories = await this._categoryService.getListWithIds(cateIds);
      }

      const questionIds = test.questionIds.split(",");
      if (test.questionIds !== "") {
        questions = await Promise.all(
          questionIds.map((item) => {
            return this._questionService.getOneWithAnswers({ id: item });
          })
        );
      }
      const tempAnswerIds = test.answerIds.split(",");

      const levels = await this._levelService.getAll({ direction: "ASC" });
      const levelsMap = {};
      for (const item of levels.rows) levelsMap[item.id] = item.name;

      const results = this._mainService.getTestResult(
        questions,
        tempAnswerIds,
        categories,
        levelsMap
      );

      await this._resultService.create({
        data: JSON.stringify(results),
        userId: test.userId,
        testId: test.id,
      });

      return this.noContent(res);
    } catch (error) {
      return next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const response = await this._mainService.getAllWithFilter(req.query);
      return this.paging(res, response);
    } catch (error) {
      return next(error);
    }
  };
  getOne = async (req, res, next) => {
    try {
      const withResult = req.query.result;
      delete req.query.result;
      const test = await this._mainService.getOne(req.query);
      if (!test) throw { status: 422, message: "Invalid test" };

      const response = test.toJSON();

      if (test.cateIds !== "") {
        const cateIds = test.categoryIds.split(",");
        console.log(cateIds);
        response.categories = await Promise.all(
          cateIds.map((item) => {
            return this._categoryService.getOne({ id: item });
          })
        );
      }

      if (test.questionIds !== "") {
        const questionIds = test.questionIds.split(",");
        response.questions = await Promise.all(
          questionIds.map((item) => {
            return this._questionService.getOneWithAnswers({ id: item });
          })
        );
      }
      const answerIds = test.answerIds.split(",");
      const answerMap = {};
      for (const id of answerIds) answerMap[id] = true;

      const finalQuestions = [];
      for (const item of response.questions) {
        const currItem = item.toJSON();
        for (const index in currItem.answers) {
          const currAnswer = currItem.answers[index];
          if (!withResult) delete currAnswer.isCorrect;
          if (answerMap[currAnswer.id]) {
            currItem.answers[index].isSelected = true;
            break;
          }
        }
        finalQuestions.push(currItem);
      }
      response.questions = finalQuestions;

      return this.ok(res, response);
    } catch (error) {
      return next(error);
    }
  };

  getTestResult = async (req, res, next) => {
    try {
      const { id } = req.query;

      const result = await this._resultService.getOne({ testId: id });
      if (!result) throw { status: 422, message: "Invalid test" };

      const response = JSON.parse(result.data);

      return this.ok(res, response);
    } catch (error) {
      return next(error);
    }
  };

  getReview = async (req, res, next) => {
    try {
      const { userId, categoryId } = req.query;

      const tests = await this._mainService.getListByCategory(
        categoryId,
        userId,
        3
      );
      const testIds = tests.map((item) => item.id);

      const results = await this._resultService.getListByTest(testIds);
      const resultData = results.map((item) => ({
        ...JSON.parse(item.data)[categoryId],
      }));

      const total = resultData.reduce((sum, item) => sum + item.point * 10, 0);

      const percents = resultData.map((item) => item.point * 10);
      const averagePercent = total / resultData.length;

      return this.ok(res, { averagePercent, percents });
    } catch (error) {
      return next(error);
    }
  };

  getResultData = async (req, res, next) => {
    try {
      const { userId, categoryId } = req.query;

      const tests = await this._mainService.getListByCategory(
        categoryId,
        userId
      );
      const testIds = tests.map((item) => item.id);

      const results = await this._resultService.getListByTest(testIds);
      const resultData = results.map((item) => ({
        ...JSON.parse(item.data)[categoryId],
      }));

      const data = resultData.map((item, index) => ({
        testId: results[index].testId,
        percent: item.point * 10,
        createdAt: tests[index].createdAt,
        maxPercent: 100,
      }));

      return this.ok(res, data);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = TestController;
