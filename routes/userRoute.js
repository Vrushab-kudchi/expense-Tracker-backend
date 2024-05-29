import express from "express";
import { getProfile, login, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/get-user", isAuthenticated, getProfile);

export default router;
