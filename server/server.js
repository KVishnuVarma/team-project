import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './models/AdminRoutes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import UserModel from './models/user.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Initialize DB connection
DbCon();

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173" // Adjust frontend origin as needed
}));

// Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Derive __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);

// Fetch users route
app.get('/api/admin/getusers', async (req, res) => {
    try {
        const users = await UserModel.find(); // Ensure User model is imported
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// File upload route
app.post('/upload', upload.array('files'), (req, res) => {
    try {
        console.log(req.body)
        if (!req.files) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }
        res.json({ message: 'Files uploaded successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error uploading files' });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('test');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
