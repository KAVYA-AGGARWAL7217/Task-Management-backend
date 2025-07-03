require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const authRouter = require("./Routes/auth");
const publicKey = fs.readFileSync("./public.key", "utf-8");

const taskRouter = require("./Routes/task");
const userRouter = require("./Routes/user");
const cors = require("cors");
const server = express();
server.use(express.json());
const PORT = 4000;
async function main() {
  try {
    console.log("Attempting to connect to database...");
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
}

main().catch((err) => console.log(err));
const auth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = jwt.verify(token, publicKey);
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
server.use(cors());
server.use("/auth", authRouter.router);
server.use("/user", auth, userRouter.router);
server.use("/tasks", taskRouter.router);
server.listen(PORT, () => {
  console.log("Server is running on", +PORT);
});
