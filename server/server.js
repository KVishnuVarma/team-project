import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import QuestionRoutes from './routes/Question.js';
import AdminRoutes from './models/AdminRoutes.js' // Corrected import
import ContestRoutes from './routes/contestRoutes.js'; // Correct contest routes import
import StatsRoutes from './routes/UserStats.js'
import UserModel from './models/user.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to Database
DbCon();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cookieparser()); // for reading cookies
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// Multer for file uploads (e.g., profile images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImages/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// API Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/questions', QuestionRoutes);
app.use('/api/admin', AdminRoutes); // Admin routes
app.use('/api/contests', ContestRoutes); // Contest routes
app.use('/api/stats', StatsRoutes);

// Route to find user profile from JWT token
app.get('/api/findProfile', async (req, res) => {
    try {
        const token = req.cookies.token; // Read token from cookies
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRETE); // Verify JWT
        const userData = await UserModel.findOne({ _id: decode.userId });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
});

// Route to update user profile
app.put('/api/updateProfile', async (req, res) => {
    try {
        const token = req.cookies.token; // Read token from cookies
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT

        const { name, phone, email, gender, address, department, domain } = req.body;

        const updatedData = await UserModel.findOneAndUpdate(
            { _id: decode.userId },
            { name, phone, email, gender, address, department, domain },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedData);
    } catch (error) {
        console.log("Error updating profile", error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

// Route to test if API is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
