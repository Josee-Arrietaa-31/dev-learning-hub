import { Course } from '../database/models';

const serializeDoc = (doc: any) => {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
  };
};

export const getExpiredCoursesCount = async () => {
  const count = await Course.find({ isExpired: false }).countDocuments();
  return count;
};

export const getCoursesWithPaginationDal = async (currentPage: number, pageSize: number) => {
  const offset = (currentPage - 1) * pageSize;
  const courses = await Course.find({ isExpired: false }).skip(offset)
    .limit(pageSize)
    .lean();
  return courses.map(serializeDoc);
};

export const bulkInsertCourses = async (courses: any) => Course.insertMany(courses);

export const truncateCourses = async () => Course.deleteMany();

export const createCourseDal = async (
  course: any,
) => Course.create(course);
