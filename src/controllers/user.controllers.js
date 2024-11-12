import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/userProfile.model.js";

const getSelf = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res.status(401).json(apiResponse(401, null, "Unauthorized"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json(apiResponse(404, null, "User not found."));
  }

  return res.status(200).json(apiResponse(200, user, "Get user successfully."));
});

export { getSelf };
