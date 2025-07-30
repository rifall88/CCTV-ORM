import express from "express";
import {
  createLink,
  getAllLink,
  updateLink,
  deleteLink,
} from "../controllers/linkController.js";
import { validateCreate, validateUpdate } from "../validators/linkValidator.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, validateCreate, createLink);
router.get("/", authenticate, getAllLink);
router.put("/:id", authenticate, isAdmin, validateUpdate, updateLink);
router.delete("/:id", authenticate, isAdmin, deleteLink);

export default router;
