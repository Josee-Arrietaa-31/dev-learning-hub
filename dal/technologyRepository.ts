import { Technology } from '../database/models';
import { serializeArray } from '../database/serialize';

export const bulkInsertTechnologies = async (
  technologies: any,
) => Technology.insertMany(technologies);

export const truncateTechnologies = async () => Technology.deleteMany();

export const getTechnologiesCountDal = async () => {
  const count = await Technology.find().countDocuments();
  return count;
};

export const getTechnologiesWithPaginationDal = async (currentPage: number, pageSize: number) => {
  const offset = (currentPage - 1) * pageSize;
  const technologies = await Technology.find().skip(offset)
    .limit(pageSize)
    .lean();
  return technologies.map((tech: any) => ({
    ...tech,
    _id: tech._id.toString(),
  }));
};

export const getTechnologyBySlugDal = async (slug: string) => {
  const tech = await Technology.findOne({ slug }).lean();
  if (!tech) return null;
  return {
    ...tech,
    _id: tech._id.toString(),
  };
};

export const getTechnologiesDal = async () => {
  const technologies = await Technology.find().lean();
  return technologies.map((tech: any) => ({
    ...tech,
    _id: tech._id.toString(),
  }));
};

export const getTechnologyByIdDal = async (id: string) => {
  const tech = await Technology.findById(id).lean();
  if (!tech) return null;
  return {
    ...tech,
    _id: tech._id.toString(),
  };
};
