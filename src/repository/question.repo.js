import sequelize from "../../config/db.connection.js";
import { Questions, Value } from "../models/model.js";

const questionRepo = {
  createQuestion: async (categoryId, title, type, valuesData) => {
    try {
      // Create the question under a specific category
      const order =
        (await Questions.count({ where: { category_id: categoryId } })) + 1;
      const question = await Questions.create(
        {
          category_id: categoryId,
          title: title,
          type: type,
          order: order,
          values: valuesData,
        },
        {
          include: [Value],
        }
      );
      return question;
    } catch (error) {
      throw error;
    }
  },
  getAllQuestions: async () => {
    try {
      const allQuestions = await Questions.findAll({
        include: [Value],
      });
      return allQuestions;
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (questionId) => {
    try {
      await sequelize.sync();
      const deletedQuestion = await Questions.destroy({
        where: {
          id: questionId,
        },
        include: [Value],
      });
      return deletedQuestion;
    } catch (error) {
      throw error;
    }
  },

  updateQuestion: async (questionId, order) => {
    try {
      // Update the question order
      const [updatedRowsCount] = await Questions.update(
        {
          order: order,
        },
        {
          where: { id: questionId },
        }
      );

      console.log(updatedRowsCount);

      if (updatedRowsCount === 0) {
        throw new Error("Question not updated");
      }

      // Fetch the updated question
      const updatedQuestion = await Questions.findByPk(questionId);

      if (!updatedQuestion) {
        throw new Error("Question not found");
      }

      return {
        message: "Question order changed successfully",
        question: updatedQuestion,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default questionRepo;
