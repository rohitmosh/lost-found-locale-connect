const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

console.log('Checking environment variables...');

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

// Load environment variables
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

// Display MongoDB URI (partially masked for security)
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  const maskedUri = uri.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, (match, p1, p2, p3) => {
    return `mongodb${p1 || ''}://${p2}:${'*'.repeat(8)}@`;
  });
  console.log('\x1b[32m%s\x1b[0m', 'MongoDB URI found:', maskedUri);
}

console.log('\x1b[32m%s\x1b[0m', 'All required environment variables are present.'); 