// models/Contest.js
import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true } // Only active contests are shown to users
});

export default mongoose.model('Contest', contestSchema);
