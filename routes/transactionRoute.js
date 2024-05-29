import express from "express";
import isAuthenticated from "../middleware/userMiddleware.js";
import {
  addTransaction,
  deleteTransaction,
  getAllTransaction,
  getTransactionInfo,
  getTransactionMonths,
  removeTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/add", addTransaction);
router.post("/remove", removeTransaction);
router.delete("/delete", deleteTransaction);
router.get("/get", getAllTransaction);
router.get("/info", getTransactionInfo);
router.get("/info-months", getTransactionMonths);

export default router;
