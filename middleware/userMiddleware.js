import jwt from "jsonwebtoken";
import errorHandler from "../lib/errorHandler.js";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.token;

  if (!authHeader && !cookieToken) {
    return next(new errorHandler("Please login again", 401));
  }

  const Bear_Token = authHeader ? authHeader.split(" ")[1] : null;
  const token = Bear_Token || cookieToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded._id;
    next();
  } catch (error) {
    return next(new errorHandler("Please login again", 401));
  }
};

export default isAuthenticated;
