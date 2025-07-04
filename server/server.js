const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

// Check if .env.local file exists
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: .env.local file not found!');
  console.log('Please create a .env.local file in the root directory with the following variables:');
  console.log('\x1b[33m%s\x1b[0m', 'MONGODB_URI=your_mongodb_connection_string_here');
  console.log('\x1b[33m%s\x1b[0m', 'JWT_SECRET=your_jwt_secret_here');
  console.log('\x1b[33m%s\x1b[0m', 'PORT=5000');
  console.log('\x1b[33m%s\x1b[0m', 'VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here');
  process.exit(1);
}

// Load env vars from the root .env.local file
dotenv.config({ path: envPath });

// Check required variables
const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingVars = [];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', `ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
  console.log('Please add them to your .env.local file');
  process.exit(1);
}

// Import connectDB after environment variables are loaded
const connectDB = require('./db/connection');

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/auth');
const lostItemRoutes = require('./routes/lostItemRoutes');
const foundItemRoutes = require('./routes/foundItemRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/lost-items', lostItemRoutes);
app.use('/api/found-items', foundItemRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 