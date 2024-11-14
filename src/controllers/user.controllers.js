import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { UserProfile } from "../models/userProfile.model.js";

const getSelf = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res.status(401).json(apiResponse(401, null, "Unauthorized"));
  }

  const user = await UserProfile.findOne({ authUserId: userId });

  if (!user) {
    return res.status(404).json(apiResponse(404, null, "User not found."));
  }

  return res.status(200).json(apiResponse(200, user, "Get user successfully."));
});

const getUser = asyncHandler(async (req, res) => {
  const username = req.query.username;
  console.log(username);
  if (!username) {
    return res.status(401).json(apiResponse(401, null, "Unauthorized"));
  }

  const user = await UserProfile.findOne({ username: username }).select(
    " -__v -authUserId -createdAt -updatedAt -email"
  );

  if (!user) {
    return res.status(404).json(apiResponse(404, null, "User not found."));
  }

  return res.status(200).json(apiResponse(200, user, "Get user successfully."));
});
export { getSelf, getUser };
