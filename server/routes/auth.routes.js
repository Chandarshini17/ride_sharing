import express from "express";
import { login, logout, register } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout); // Removed verifyToken middleware here

export default router;
