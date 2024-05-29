import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "ExpenseTracker" })
    .then((res) => {
      console.log(
        `Database Connected ${res.connection.host} dbName : ${res.connection.name}`
      );
    });
};

export default connectDb;
