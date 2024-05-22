import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import rideRoute from "./routes/ride.routes.js";

const app = express();
const PORT = 8080;

dotenv.config();

// Connect to MongoDB
const connectDB = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // This allows cookies to be sent back and forth
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);

// Error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: err.status,
    error: errorMessage,
  });
});

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Connected to backend on PORT: ${PORT}`);
});
