require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import Routes
const authRouter = require('./routes/auth');
const ideasRouter = require('./routes/ideas');
const communitiesRouter = require('./routes/communities');
const daoRouter = require('./routes/dao');
const coinsRouter = require('./routes/coins');

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/ideas', ideasRouter);
app.use('/api/communities', communitiesRouter);
app.use('/api/dao', daoRouter);
app.use('/api/coins', coinsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server launched on port ${PORT}`);
});
