import express from "express";
import {
  createLink,
  getAllLink,
  updateLink,
  deleteLink,
} from "../controllers/linkController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, createLink);
router.get("/", authenticate, isAdmin, getAllLink);
router.put("/:id", authenticate, isAdmin, updateLink);
router.delete("/:id", authenticate, isAdmin, deleteLink);

export default router;
