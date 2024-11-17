import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { UserProfile } from "../models/userProfile.model.js";
import { ApiError } from "../utils/apiError.js";

const getSelf = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    throw new ApiError(400, "User id is required.");
  }

  const user = await UserProfile.findOne({ authUserId: userId });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(apiResponse(200, user, "User fetched successfully."));
});

const getUserByUsername = asyncHandler(async (req, res) => {
  const username = req.params.username;

  if (!username) {
    throw new ApiError(400, "Username is required.");
  }

  const user = await UserProfile.findOne({ username: username }).select(
    " -__v -createdAt -updatedAt -email"
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(apiResponse(200, user, "User fetched successfully."));
});

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await UserProfile.find({}, " -__v -createdAt -updatedAt -email")
    .skip(skip)
    .limit(limit);

  return res
    .status(200)
    .json(apiResponse(200, users, "Users fetched successfully."));
});

export { getSelf, getUserByUsername, getUsers };
