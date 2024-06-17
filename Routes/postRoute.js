import express from "express";
import {
  createPost,
  deletepost,
  getposts,
  updatepost,
} from "../Controllers/postControlle.js";
import { verifyUser } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletepost);
router.put("/updatepost/:postId/:userId", verifyUser, updatepost);

export default router;
