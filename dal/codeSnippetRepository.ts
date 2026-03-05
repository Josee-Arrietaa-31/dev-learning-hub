import { CodeSnippet } from '../database/models';

const serializeDoc = (doc: any) => {
  if (!doc) return null;
  const serialized: any = {
    ...doc,
    _id: doc._id.toString(),
  };
  if (doc.technology) {
    if (typeof doc.technology === 'object' && doc.technology._id) {
      serialized.technology = {
        ...doc.technology,
        _id: doc.technology._id.toString(),
      };
    } else {
      serialized.technology = doc.technology.toString();
    }
  }
  return serialized;
};

export const bulkInsertCodeSnippetsDal = async (
  codeSnippets: any,
) => CodeSnippet.insertMany(codeSnippets);

export const truncateCodeSnippetsDal = async () => CodeSnippet.deleteMany();

export const getCodeSnippetsCountDal = async () => {
  const count = await CodeSnippet.find().countDocuments();
  return count;
};

export const getCodeSnippetsWithPaginationDal = async (currentPage: number, pageSize: number) => {
  const offset = (currentPage - 1) * pageSize;
  const codeSnippets = await CodeSnippet.find().populate('technology', 'name').skip(offset)
    .limit(pageSize)
    .lean();
  return codeSnippets.map(serializeDoc);
};

export const createCodeSnippetDal = async (
  codeSnippet: any,
) => CodeSnippet.create(codeSnippet);
