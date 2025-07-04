const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

// Check if .env.local file exists
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: .env.local file not found!');
  process.exit(1);
}

// Load environment variables
dotenv.config({ path: envPath });

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: MONGODB_URI is not defined in .env.local file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Get all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('\nCollections in the database:');
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
      
      // Count documents in each collection
      console.log('\nDocument counts:');
      for (const collection of collections) {
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        console.log(`- ${collection.name}: ${count} documents`);
      }
      
      // Sample data from users collection
      console.log('\nSample user data:');
      const users = await mongoose.connection.db.collection('users').find({}).limit(1).toArray();
      console.log(JSON.stringify(users[0], null, 2));
      
      // Exit
      console.log('\nDatabase check complete.');
      process.exit(0);
    } catch (error) {
      console.error('Error checking collections:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }); 