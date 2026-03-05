import { InterviewQuestion } from '../database/models';

const serializeDoc = (doc: any) => {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
    technology: doc.technology?.toString() || doc.technology,
  };
};

export const bulkInterviewQuestions = async (
  interviewQuestions: any,
) => InterviewQuestion.insertMany(interviewQuestions);

export const getInterviewQuestionsByTechnologyIdWithPaginationDal = async (
  technologyId: string, currentPage: number, pageSize: number,
) => {
  const offset = (currentPage - 1) * pageSize;
  const interviewQuestions = await InterviewQuestion.find({ technology: technologyId }).skip(offset)
    .limit(pageSize)
    .lean();
  return interviewQuestions.map(serializeDoc);
};

export const truncateInterviewQuestions = async () => InterviewQuestion.deleteMany();

export const getInterviewQuestionsCountByTechnologyIdDal = async (technologyId: string) => {
  const count = await InterviewQuestion.find({ technology: technologyId }).countDocuments();
  return count;
};

export const createInterviewQuestionDal = async (
  interviewQuestion: any,
) => InterviewQuestion.create(interviewQuestion);
