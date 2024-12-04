import express from "express";
import Contest from "../models/Contest.js";

const router = express.Router();

// Add a new contest (POST)
router.post("/add", async (req, res) => {
  const { title, startTime, description, category } = req.body;
  
  if (!title || !startTime || !description || !category) {
    return res.status(400).json({ message: "Missing required fields: title, startTime, description, category" });
  }

  const contest = new Contest({
    title,
    startTime,
    description,
    category,
    isActive: true,
  });

  try {
    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    res.status(400).json({ message: "Failed to create contest", error });
  }
});

// Get all contests (GET)
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests); // Return the list of contests
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve contests", error });
  }
});

export default router;
