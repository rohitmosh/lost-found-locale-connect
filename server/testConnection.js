const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

console.log('Testing MongoDB connection...');

// Check if .env.local file exists
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: .env.local file not found!');
  console.log('Please run: npm run setup:env');
  process.exit(1);
}

// Load environment variables
dotenv.config({ path: envPath });

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: MONGODB_URI is not defined in .env.local file');
  console.log('Please run: npm run setup:env');
  process.exit(1);
}

console.log('MONGODB_URI found:', process.env.MONGODB_URI);

// Test connection
async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('\x1b[32m%s\x1b[0m', `SUCCESS: MongoDB Connected to ${conn.connection.host}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed successfully.');
    
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `ERROR connecting to MongoDB: ${error.message}`);
    console.log('\nPossible issues:');
    console.log('1. Invalid connection string format');
    console.log('2. Network connectivity issues');
    console.log('3. MongoDB Atlas IP whitelist restrictions');
    console.log('4. Incorrect username/password');
    
    process.exit(1);
  }
}

testConnection(); 