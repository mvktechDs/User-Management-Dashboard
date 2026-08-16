require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    error: {
      code: 'API_ENDPOINT_NOT_FOUND'
    }
  });
});

app.use(errorHandler);

if (require.main === module) {
  const connectDB = require('./config/db');
  connectDB();

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });

  process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Promise Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
