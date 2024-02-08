import questionService from "../services/question.service.js";

const questionController = {
  createQuestion: async (req, res) => {
    try {
      const { categoryId, title, type, values } = req.body;
      const result = await questionService.createQuestion(
        categoryId,
        title,
        type,
        values
      );
      if (result.status) {
        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const { questionId, order } = req.body;
      const result = await questionService.updateQuestion(questionId, order);
      res.status(200).json({
        question: result.question,
        updatedValues: result.updatedValues,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },
  getAllQuestions: async (req, res) => {
    try {
      const result = await questionService.getAllQuestions();

      if (result.status) {
        // Sort the questions based on the 'order' field
        if (req.query.order === "desc") {
          result.questions.sort((a, b) => b.order - a.order); // Descending order
        } else {
          result.questions.sort((a, b) => a.order - b.order); // Ascending order
        }

        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const result = await questionService.deleteQuestion(req.body.questionId);
      if (result.status) {
        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        response_code: 500,
        result: result,
      });
    }
  },
};

export default questionController;
