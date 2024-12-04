import express from "express";
import UserStats from "../models/UserStats.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/profileStats", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const stats = await UserStats.findOne({ userId: decoded.userId });

    if (!stats) return res.status(404).json({ message: "Stats not found" });

    res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
});

export default router;
