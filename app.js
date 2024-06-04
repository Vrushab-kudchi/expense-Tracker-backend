import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/globalError.js";
import connectDb from "./lib/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

//Routes
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan("dev"));

connectDb();

app.get("/", (req, res) => {
  res.status(200).json({ Success: "Working" });
});

app.use("/api/user", userRoute);
app.use("/api/transaction", transactionRoute);

app.all("*", (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
