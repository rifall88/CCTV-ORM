import express from "express";
import {
  register,
  login,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", authenticate, isAdmin, validateRegister, register);
router.get("/", authenticate, isAdmin, getAllUser);
router.put("/:id", authenticate, isAdmin, validateUpdate, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);
router.post("/login", validateLogin, login);

export default router;
