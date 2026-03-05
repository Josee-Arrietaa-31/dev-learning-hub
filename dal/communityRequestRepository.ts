import { CommunityRequestState } from '../constants/enums';
import { CommunityRequest } from '../database/models';

const serializeDoc = (doc: any) => {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
  };
};

export const bulkInsertCommunityRequestDal = async (
  communityRequests: any,
) => CommunityRequest.insertMany(communityRequests);

export const truncateCommunityRequestDal = async () => CommunityRequest.deleteMany();

export const getCommunityRequestsCountDal = async () => {
  const count = await CommunityRequest.find({
    state: CommunityRequestState.WAITING_REVIEW,
  }).countDocuments();
  return count;
};

export const getCommunityRequestsWithPaginationDal = async (
  currentPage: number, pageSize: number,
) => {
  const offset = (currentPage - 1) * pageSize;
  const communityRequests = await CommunityRequest.find({
    state: CommunityRequestState.WAITING_REVIEW,
  }).skip(offset)
    .limit(pageSize)
    .lean();
  return communityRequests.map(serializeDoc);
};

export const createCommunityRequestDal = async (
  communityRequest: any,
) => CommunityRequest.create(communityRequest);

export const getCommunityRequestByIdDal = async (
  communityRequestId: string,
) => {
  const doc = await CommunityRequest.findById(communityRequestId).lean();
  return serializeDoc(doc);
};

export const approveCommunityRequestDal = async (
  communityRequestId: any,
  userEmail: string,
) => {
  const doc = await CommunityRequest.findOneAndUpdate(
    { _id: communityRequestId },
    { $addToSet: { approves: userEmail } },
    { returnOriginal: false },
  ).lean();
  return serializeDoc(doc);
};

export const mergeCommunityRequestDal = async (
  communityRequestId: any,
) => {
  const doc = await CommunityRequest.findOneAndUpdate(
    { _id: communityRequestId },
    { state: CommunityRequestState.MERGED },
    { returnOriginal: false },
  ).lean();
  return serializeDoc(doc);
};
