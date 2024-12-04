// routes/ContestRoutes.js
import express from 'express';
import Contest from '../models/Contest.js';

const router = express.Router();

// Get all active contests
router.get('/', async (req, res) => {
    try {
        const contests = await Contest.find({ isActive: true });
        res.json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve contests', error });
    }
});

// Add a new contest (Admin only)
router.post('/add', async (req, res) => {
    const { title, startTime, description } = req.body;

    const contest = new Contest({
        title,
        startTime,
        description,
        isActive: true
    });

    try {
        await contest.save();
        res.status(201).json(contest);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create contest', error });
    }
});

export default router;
