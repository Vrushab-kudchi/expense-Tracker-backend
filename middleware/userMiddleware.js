import jwt from "jsonwebtoken";
import errorHandler from "../lib/errorHandler.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new errorHandler("Please login again", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode._id;
    next();
  } catch (error) {
    return next(new errorHandler("Please login again", 401));
  }
};

export default isAuthenticated;
