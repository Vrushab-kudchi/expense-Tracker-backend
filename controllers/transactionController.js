import errorHandler from "../lib/errorHandler.js";
import { TryCatch } from "../utils/Features.js";
import { handleZodError, TransactionSchema } from "../utils/zodSchema.js";
import { Transaction } from "../models/transactionModel.js";
import mongoose from "mongoose";

export const addTransaction = TryCatch(async (req, res, next) => {
  const data = TransactionSchema.safeParse(req.body);
  if (!data.success) {
    const response = handleZodError(data);
    return next(new errorHandler(response, 400));
  }

  await Transaction.create({ ...req.body, user: req.user, category: "income" });
  res.status(201).json({ success: true, message: "new Transaction Created" });
});

export const removeTransaction = TryCatch(async (req, res, next) => {
  const data = TransactionSchema.safeParse(req.body);
  if (!data.success) {
    const response = handleZodError(data);
    return next(new errorHandler(response, 400));
  }

  await Transaction.create({
    ...req.body,
    user: req.user,
    category: "expense",
  });
  res.status(201).json({ success: true, message: "new Transaction Created" });
});

export const deleteTransaction = TryCatch(async (req, res, next) => {
  const { _id } = req.body;

  if (!_id || !mongoose.isValidObjectId(_id)) {
    return next(new errorHandler("Invalid or missing _id", 400));
  }

  const deletedTransaction = await Transaction.findOneAndDelete({ _id });
  if (!deletedTransaction) {
    return next(new errorHandler("Transaction not found", 404));
  }
  res.status(202).json({ success: true, message: "Transaction Deleted" });
});

export const getAllTransaction = TryCatch(async (req, res) => {
  const data = await Transaction.find({ user: req.user });
  res.status(200).json({ success: true, data });
});

export const getTransactionInfo = TryCatch(async (req, res) => {
  let income = await Transaction.find({
    user: req.user,
    category: "income",
  });

  let expense = await Transaction.find({
    user: req.user,
    category: "expense",
  });

  const maxIncome = income.sort((a, b) => b.money - a.money);
  const maxExpense = expense.sort((a, b) => b.money - a.money);
  let totalIncome = 0;
  income.forEach((item) => {
    totalIncome += item.money;
  });

  let totalExpense = 0;
  expense.forEach((item) => {
    totalExpense += item.money;
  });

  const profit = totalIncome - totalExpense;

  res.status(200).json({
    success: true,
    maxIncome: maxIncome[0],
    maxExpense: maxExpense[0],
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    profit: profit,
  });
});

export const getTransactionMonths = TryCatch(async (req, res, next) => {
  const data = await Transaction.find({ user: req.user });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsData = {};
  data.forEach((item) => {
    const month = monthNames[item.createdAt.getMonth()];

    if (!monthsData[month]) {
      monthsData[month] = [];
    }

    monthsData[month].push(item);
  });
  res.status(200).json({ success: true, data: monthsData });
});
