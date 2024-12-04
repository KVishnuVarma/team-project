import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rank: { type: String, required: true },
  solvedQuestions: { type: Number, default: 0 },
  recentActivity: { type: Array, default: [] }, // e.g., ["Solved Problem X", "Attempted Problem Y"]
  streak: { type: Number, default: 0 }, // Days of active participation
  recentContests: { type: Array, default: [] }, // e.g., ["Contest 1", "Contest 2"]
});

export default mongoose.model("UserStats", userStatsSchema);
