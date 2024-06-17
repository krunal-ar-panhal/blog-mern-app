import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";

export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      res.status(400).json({
        message: "please fill all inputs",
      });
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        message: "user alredy exsted",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "user created",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all inputs",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(402).json({
        message: "wrong password",
      });
    }

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWTS
    );
    const { password: pass, ...rest } = user._doc;
    return res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "user logged",
        rest,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const Signout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({
      message: "user signout",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.JWTS
      );
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { _id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWTS
      );
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};

export const userDelete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(400).json("delete your account");
    }
    res.clearCookie("accessToken");
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json("usr not found");
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(403).json(error);
  }
};
