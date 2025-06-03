require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes and middleware
const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Validate required env variable
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in your .env file.');
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', authenticateToken, stationRoutes);

// Serve frontend static files in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  // Catch-all route to serve index.html for SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  // Health check
  app.get('/', (req, res) => {
    res.send('🚗 Charging Stations API is running');
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
