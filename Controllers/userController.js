import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user._id);
    console.log(user);
    const hashPassword = bcrypt.hashSync(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: username,
        email: email,
        password: hashPassword,
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json({
      success: true,
      message: "user updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "You are not allowed to see all users'",
    });
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "You are not allowed to delete this user",
    });
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
