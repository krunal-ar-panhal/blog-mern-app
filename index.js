import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/authRoute.js";
import userRouter from "./Routes/userRoute.js";
import postRoutes from "./Routes/postRoute.js";
import commentRoutes from "./Routes/commetRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
config();

const PORT = process.env.PORT;

connect(process.env.MONGODB)
  .then(() => {
    console.log("MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.listen(PORT, () => {
  console.log(`${PORT}`);
});

app.get("/", (req, res) => {
  res.json("BLOG APP");
});
