const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

console.log('Analyzing user report statistics...');

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

// Import models
const User = require('./models/User');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');

// Function to get user report statistics
async function getUserReportStats() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB');
    
    // Get all users
    const users = await User.find().select('_id name email createdAt');
    console.log(`Found ${users.length} users`);
    
    // Table header
    console.log('\n\x1b[36m%s\x1b[0m', 'USER REPORT STATISTICS');
    console.log('\x1b[36m%s\x1b[0m', '='.repeat(120));
    console.log('\x1b[36m%s\x1b[0m', '| ID                       | Name                 | Email                | Lost Items (A/R) | Found Items (A/R) | Total (A/R) |');
    console.log('\x1b[36m%s\x1b[0m', '|'.padEnd(121, '-'));
    
    // Process each user
    for (const user of users) {
      // Get lost items for this user
      const lostItems = await LostItem.find({ userId: user._id });
      const activeLostItems = lostItems.filter(item => item.status === 'active').length;
      const resolvedLostItems = lostItems.filter(item => item.status === 'resolved').length;
      
      // Get found items for this user
      const foundItems = await FoundItem.find({ userId: user._id });
      const activeFoundItems = foundItems.filter(item => item.status === 'active').length;
      const resolvedFoundItems = foundItems.filter(item => item.status === 'claimed').length;
      
      // Calculate totals
      const totalActive = activeLostItems + activeFoundItems;
      const totalResolved = resolvedLostItems + resolvedFoundItems;
      const totalItems = lostItems.length + foundItems.length;
      
      // Format the output row
      console.log(
        '| ' + 
        user._id.toString().padEnd(24) + ' | ' +
        user.name.substring(0, 19).padEnd(20) + ' | ' +
        user.email.substring(0, 19).padEnd(20) + ' | ' +
        `${activeLostItems}/${resolvedLostItems}/${lostItems.length}`.padEnd(16) + ' | ' +
        `${activeFoundItems}/${resolvedFoundItems}/${foundItems.length}`.padEnd(17) + ' | ' +
        `${totalActive}/${totalResolved}/${totalItems}`.padEnd(11) + ' |'
      );
    }
    
    console.log('\x1b[36m%s\x1b[0m', '='.repeat(120));
    console.log('\x1b[33m%s\x1b[0m', 'Note: Numbers shown as Active/Resolved/Total for each category');
    
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `ERROR: ${error.message}`);
    process.exit(1);
  }
}

// Run the function
getUserReportStats();