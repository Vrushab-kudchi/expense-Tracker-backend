import jwt from "jsonwebtoken";

export const TryCatch = (program) => async (req, res, next) => {
  try {
    await program(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const generateToken = async (data) => {
  const token = await jwt.sign(
    JSON.stringify({ _id: data._id }),
    process.env.JWT_KEY
  );
  return token;
};
