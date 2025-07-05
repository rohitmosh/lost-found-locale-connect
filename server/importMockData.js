const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Path to .env.local file
const envPath = path.resolve(__dirname, '../.env.local');

// Check if .env.local file exists
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: .env.local file not found!');
  console.log('Please create a .env.local file in the root directory with the following variables:');
  console.log('\x1b[33m%s\x1b[0m', 'MONGODB_URI=your_mongodb_connection_string_here');
  console.log('\x1b[33m%s\x1b[0m', 'JWT_SECRET=your_jwt_secret_here');
  process.exit(1);
}

// Load environment variables
dotenv.config({ path: envPath });

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: MONGODB_URI is not defined in .env.local file');
  process.exit(1);
}

// Import models
const User = require('./models/User');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');

// Path to mock data files
const mockDataPath = path.resolve(__dirname, '../mock_data');

// Function to read mock data files
const readMockData = (filename) => {
  try {
    const filePath = path.join(mockDataPath, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing collections
      await mongoose.connection.db.dropCollection('users').catch(() => console.log('No users collection to drop'));
      await mongoose.connection.db.dropCollection('lostitems').catch(() => console.log('No lostitems collection to drop'));
      await mongoose.connection.db.dropCollection('founditems').catch(() => console.log('No founditems collection to drop'));
      await mongoose.connection.db.dropCollection('locations').catch(() => console.log('No locations collection to drop'));
      await mongoose.connection.db.dropCollection('reports').catch(() => console.log('No reports collection to drop'));
      await mongoose.connection.db.dropCollection('notifications').catch(() => console.log('No notifications collection to drop'));
      await mongoose.connection.db.dropCollection('item_matches').catch(() => console.log('No item_matches collection to drop'));
      
      console.log('Existing collections dropped');
      
      // Read mock data
      const usersData = readMockData('users.json');
      const lostItemsData = readMockData('lost_items.json');
      const foundItemsData = readMockData('found_items.json');
      const locationsData = readMockData('locations.json');
      const reportsData = readMockData('reports.json');
      const notificationsData = readMockData('notifications.json');
      
      // Process users data - hash passwords and remove _id field
      const processedUsers = await Promise.all(usersData.map(async (user) => {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Create user without _id (let MongoDB generate it)
        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          phoneNumber: user.phone,
          profilePicture: user.profilePic,
          trustScore: user.trustScore,
          verifiedEmail: user.verifiedEmail,
          verifiedPhone: user.verifiedPhone,
          notificationPreferences: user.notificationPreferences,
          createdAt: new Date(user.accountCreated),
          updatedAt: new Date(user.accountCreated)
        };
      }));
      
      // Import users
      await User.insertMany(processedUsers);
      console.log(`${processedUsers.length} users imported`);
      
      // Process lost items data - remove _id field
      const processedLostItems = lostItemsData.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      
      // Import lost items
      await mongoose.connection.collection('lostitems').insertMany(processedLostItems);
      console.log(`${processedLostItems.length} lost items imported`);
      
      // Process found items data - remove _id field
      const processedFoundItems = foundItemsData.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      
      // Import found items
      await mongoose.connection.collection('founditems').insertMany(processedFoundItems);
      console.log(`${processedFoundItems.length} found items imported`);
      
      // Process locations data - remove _id field
      const processedLocations = locationsData.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      
      // Import locations
      await mongoose.connection.collection('locations').insertMany(processedLocations);
      console.log(`${processedLocations.length} locations imported`);
      
      // Process reports data - remove _id field
      const processedReports = reportsData.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      
      // Import reports
      await mongoose.connection.collection('reports').insertMany(processedReports);
      console.log(`${processedReports.length} reports imported`);
      
      // Process notifications data - remove _id field
      const processedNotifications = notificationsData.map(item => {
        const { _id, ...rest } = item;
        return rest;
      });
      
      // Import notifications
      await mongoose.connection.collection('notifications').insertMany(processedNotifications);
      console.log(`${processedNotifications.length} notifications imported`);
      
      // Create empty item_matches collection
      await mongoose.connection.createCollection('item_matches');
      console.log('Empty item_matches collection created');
      
      // Verify user passwords are correctly set
      const testUser = await User.findOne({ email: 'divya.kumar@gmail.com' }).select('+password');
      if (testUser) {
        const isMatch = await bcrypt.compare('Divya@123', testUser.password);
        console.log(`Test user (Divya) password verification: ${isMatch ? 'Success' : 'Failed'}`);
      } else {
        console.log('Test user (Divya) not found');
      }
      
      console.log('\x1b[32m%s\x1b[0m', 'All mock data imported successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Error importing mock data:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }); 