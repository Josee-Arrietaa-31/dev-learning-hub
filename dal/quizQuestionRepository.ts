import mongoose from 'mongoose';
import { QUIZ_QUESTIONS_COUNT } from '../constants/config';
import { QuizQuestion } from '../database/models';

const { Types } = mongoose;

const serializeDoc = (doc: any) => {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
    technology: doc.technology?.toString() || doc.technology,
  };
};

export const bulkInsertQuizQuestionsDal = async (
  quizQuestions: any,
) => QuizQuestion.insertMany(quizQuestions);

export const truncateQuizQuestionsDal = async () => QuizQuestion.deleteMany();

export const getRandomQuizQuestionsByTechnologyIdDal = async (
  technologyId: string,
) => {
  const questions = await QuizQuestion.aggregate([{
    $match: { technology: Types.ObjectId(technologyId) },
  }]).sample(QUIZ_QUESTIONS_COUNT);
  return questions.map(serializeDoc);
};
