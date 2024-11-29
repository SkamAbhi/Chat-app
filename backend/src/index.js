import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieparser());

const PORT = process.env.PORT || 5001;
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
