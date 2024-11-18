const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/User');
require('dotenv').config();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// JWT authentication middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Token verified successfully");
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
});

// Email validation and password complexity regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

// Default route
app.get('/', (req, res) => {
    res.send("Welcome to ScripVault API");
});

// Register user
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password && !passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
            });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("JWT generated successfully");
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Profile route (protected)
app.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update user profile route (protected)
app.put('/profile', auth, async (req, res) => {
    console.log("Profile Update Route Hit");
    const { email, password } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password && !passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
            });
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({ message: 'Profile updated successfully', user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Example protected route
app.get('/dashboard', auth, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
