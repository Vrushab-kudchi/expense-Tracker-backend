import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", logout);
router.get("/get-user", isAuthenticated, getProfile);

export default router;
