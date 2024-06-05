import errorHandler from "../lib/errorHandler.js";
import { User } from "../models/userModel.js";
import { TryCatch, generateToken } from "../utils/Features.js";
import {
  handleZodError,
  loginSchema,
  registerSchema,
} from "../utils/zodSchema.js";
import bcrypt from "bcrypt";

export const register = TryCatch(async (req, res, next) => {
  const data = registerSchema.safeParse(req.body);
  if (!data.success) {
    const response = handleZodError(data);
    return next(new errorHandler(response, 400));
  }
  const user = await User.find({ email: req.body.email });
  if (user.length > 0) {
    return next(new errorHandler("Email already exists", 409));
  }
  const newUser = await User.create(req.body);

  const token = await generateToken(newUser);

  res.cookie("token", token, {
    maxAge: 1000 * 1 * 60 * 60 * 6,
    httpOnly: true,
    sameSite: "None",
  });
  res.status(201).json({ success: true, message: "User Created" });
});

export const login = TryCatch(async (req, res, next) => {
  const data = loginSchema.safeParse(req.body);
  if (!data.success) {
    const response = handleZodError(data);
    return next(new errorHandler(response, 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new errorHandler("Invalid email or password", 401));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return next(new errorHandler("invalid Password", 401));
  }
  const token = await generateToken(user);

  res.cookie("token", token, {
    maxAge: 1000 * 1 * 60 * 60 * 6,
    httpOnly: true,
    sameSite: "None",
  });
  res.status(200).json({ success: true, message: "Success" });
});

export const getProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({ success: true, user });
});

export const logout = TryCatch(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: new Date(0),
  });
  res.status(200).json({ success: true, message: "Successfully logged out" });
});
