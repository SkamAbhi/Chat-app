import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);
router.get("/send/:id", protectedRoute, sendMessages);

export default router;
