const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profile');
const skillsRoutes = require('./routes/skills');
const requestsRoutes = require('./routes/requests');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skillswap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Public routes (no auth required)
app.use('/public', publicRoutes);
app.use('/api', authRoutes); // Register/login routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Skillswap API!');
});

// Protected routes (auth required)
app.use('/profile', auth, profileRoutes);
app.use('/skills', auth, skillsRoutes);
app.use('/requests', auth, requestsRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

