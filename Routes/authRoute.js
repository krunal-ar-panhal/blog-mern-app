import express from "express";
import {
  Signin,
  Signout,
  Signup,
  getUser,
  google,
  userDelete,
} from "../Controllers/authController.js";
import { verifyUser } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/signout", Signout);
router.post("/google", google);
router.delete("/delete/:id", verifyUser, userDelete);
router.get("/:userId", getUser); //kis user n commet kiya h us user ko get krne k liye

export default router;
