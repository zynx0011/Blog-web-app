import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";

export const verifyjwt = asyncHandler(async (req, _, next) => {
  try {
    const Token =
      req.cookies?.accessToken ||
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(Token);
    if (!Token) {
      throw new ApiError(404, "Invalid token");
    }

    const decoded = Jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(402, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "invalid token error");
  }
});
