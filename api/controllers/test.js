const BaseController = require("../../base/controller");
const AnswerService = require("../../services/answer");
const TestService = require("../../services/test");
const CategoryService = require("../../services/category");
const QuestionService = require("../../services/question");

class TestController extends BaseController {
  constructor() {
    super();
    this._mainService = new TestService();
    this._answerService = new AnswerService();
    this._categoryService = new CategoryService();
    this._questionService = new QuestionService();
  }

  create = async (req, res, next) => {
    try {
      const { body } = req;

      const categoryIds = body.categoryIds.join(",");

      const questionListPromise = [];
      for (const item of body.categoryIds) {
        const subQuestionPromise = this._questionService.getAllWithCategory({
          limit: 10000,
          offset: 0,
          direction: "ASC",
          categoryId: item,
        });
        questionListPromise.push(subQuestionPromise);
      }
      const questions = await Promise.all(questionListPromise);

      let amount = +body.amount;
      const questionIds = [];
      while (amount !== 0) {
        if (questions.length === 0) break;
        for (const i in questions) {
          if (questions[i].rows[0]) {
            questionIds.push(questions[i].rows[0].id);
            questions[i].rows.shift();
            amount--;
            if (amount === 0) break;
          } else {
            questions.splice(i);
            console.log(questions);
          }
        }
      }

      if (amount !== 0)
        throw { status: 422, message: "Vui lòng chọn thêm chương" };

      const newTest = {
        time: +body.time * 60,
        finishTime: +body.time * 60,
        amount: +body.amount,
        correctAmount: 0,
        wrongAmount: 0,
        eachPoint: 10 / +body.amount,
        finishPoint: 0,
        totalPoint: 10,
        categoryIds,
        questionIds: questionIds.join(","),
        answerIds: "",
        subjectId: body.subjectId,
        levelId: body.levelId,
        userId: body.userId,
      };
      const response = await this._mainService.create(newTest);
      return this.created(res, response);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { body } = req;

      const updatedTest = await this._mainService.getOne({ id: body.id });

      const answerIds = body.answerIds.join(",");

      const answerList = await this._answerService.getAllWithIds(
        body.answerIds
      );
      let correctAmount = 0;
      let wrongAmount = updatedTest.amount;
      let finishPoint = 0;

      for (const item of answerList) {
        if (item.isCorrect) {
          correctAmount++;
          finishPoint += updatedTest.eachPoint;
          wrongAmount--;
        }
      }
      updatedTest.finishTime = body.finishTime * 60;
      updatedTest.correctAmount = correctAmount;
      updatedTest.wrongAmount = wrongAmount;
      updatedTest.finishPoint = finishPoint;
      updatedTest.answerIds = answerIds;

      const response = await this._mainService.update(updatedTest.toJSON());
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
}

module.exports = TestController;
