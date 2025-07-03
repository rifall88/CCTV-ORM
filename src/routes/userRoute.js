import express from "express";
import { register, login } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", authenticate, isAdmin, validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
