import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import QuestionRoutes from './routes/Question.js';
import AdminRoutes from './models/AdminRoutes.js';
import ContestRoutes from './routes/contestRoutes.js'; // New Import
import UserModel from './models/user.js';
import jwt from "jsonwebtoken"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

DbCon();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImages/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/api/auth', AuthRoutes);
app.use('/api/questions', QuestionRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/contests', ContestRoutes); // Add the contest routes

app.get('/api/findProfile', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, process.env.JWT_SECRETE);
        const userData = await UserModel.findOne({ _id: decode.userId });
        
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.send(userData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

app.put('/api/updateProfile', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, process.env.JWT_SECRETE);
        
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

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
