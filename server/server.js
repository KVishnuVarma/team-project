import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import QuestionRoutes from './routes/Question.js'; // Import questions route
import AdminRoutes from './models/AdminRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Initialize DB connection
DbCon();

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/questions', QuestionRoutes); // Use questions route for creating questions
app.use('/api/admin', AdminRoutes); // Admin routes

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
