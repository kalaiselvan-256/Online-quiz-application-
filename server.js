const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizapp';

mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err.message || err));

// Health check
app.get('/health', async (req, res) => {
    const dbState = mongoose.connection.readyState;
    res.json({ status: 'ok', db: dbState === 1 ? 'connected' : 'disconnected' });
});

// ✅ NEW: Basic login route (doesn't affect MongoDB setup)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // You can add DB validation here later
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    // Temporary response for testing
    res.json({ message: 'Login request received', user: username });
});

// Existing API routes
const scoresRouter = require('./routes/scores');
app.use('/api', scoresRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});