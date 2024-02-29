import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";
import nodemailer from "nodemailer";
import { errorHandler } from "../utils/error.js";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access token");
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { email, username, password } = req.body;
  //console.log("email: ", email);
  if ([email, username, password].some((field) => field?.trim() === "")) {
    return next(errorHandler(404, "All fields are required"));
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return next(
      errorHandler(409, "User with email or username already exists")
    );
  }
  //console.log(req.files);

  const user = await User.create({
    email,
    password,
    username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(errorHandler(400, "required username or email for login"));
  }

  const Notuser = await User.findOne({
    email,
  });

  if (!Notuser) {
    return next(errorHandler(400, "User not found"));
  }

  const isPasswordValid = await Notuser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(errorHandler(400, "Invalid password"));
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenandRefreshToken(Notuser._id);

  const user = await User.findById(Notuser._id).select(
    "-password -refreshToken" //select mehtod will not show refresh token andd password
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
        },
        "user loggedIn successfully"
      )
    );
});

const logoutuser = asyncHandler(async (req, res) => {
  await User.findById(
    req.user._id
    //   //   {
    //   //     $unset: { refreshToken: 1 },
    //   //   },
    //   //   { new: true }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, `user was logged out successfully`));
});

const listAccount = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      return res.status(200).json(listings);
    } catch (error) {
      throw new ApiError(error);
    }
  } else {
    return new ApiError((401, "You can only view your own listings!"));
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return new ApiError(404, "User not found!");

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    throw new ApiError(error);
  }
};

export { registerUser, loginUser, logoutuser, getCurrentUser, listAccount };
