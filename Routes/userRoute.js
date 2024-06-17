import express from "express";
import { verifyUser } from "../Middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.get("/getallusers", verifyUser, getAllUsers);
router.delete("/delete/:userId", verifyUser, deleteUser);

export default router;
