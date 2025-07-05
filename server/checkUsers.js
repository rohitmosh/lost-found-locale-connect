const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function checkUsers() {
  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    // Get the database
    const db = client.db('lostfoundapp');
    
    // Get users collection
    const usersCollection = db.collection('users');
    
    // Find all users
    const users = await usersCollection.find({}).toArray();
    
    console.log(`Found ${users.length} users:`);
    
    // Print user details
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log(`  ID: ${user._id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password ? '[ENCRYPTED]' : '[MISSING]'}`);
      console.log(`  Trust Score: ${user.trustScore || 0}`);
    });
    
    // Load mock data to get passwords
    console.log('\nLoading mock data to fix missing passwords...');
    const mockDataPath = path.resolve(__dirname, '../mock_data/users.json');
    const mockUsers = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
    
    // Create a map of email to password from mock data
    const emailToPasswordMap = {};
    mockUsers.forEach(mockUser => {
      emailToPasswordMap[mockUser.email] = mockUser.password;
    });
    
    // Update users with missing passwords
    let updatedCount = 0;
    for (const user of users) {
      if (!user.password && emailToPasswordMap[user.email]) {
        console.log(`\nAdding password for ${user.email}...`);
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(emailToPasswordMap[user.email], salt);
        
        // Update the user with the password
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
        
        updatedCount++;
      }
    }
    
    console.log(`\nUpdated passwords for ${updatedCount} users`);
    
    // Check if test user exists
    const testEmail = 'aditya.sharma@gmail.com';
    const testPassword = 'Aditya@123';
    
    const testUser = await usersCollection.findOne({ email: testEmail });
    
    if (testUser) {
      console.log('\nTest user found:');
      console.log(`  ID: ${testUser._id}`);
      console.log(`  Name: ${testUser.name}`);
      console.log(`  Email: ${testUser.email}`);
      
      // Create a new test user with the correct password if needed
      if (!testUser.password) {
        console.log('\nTest user has no password, adding one...');
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);
        
        // Update the user with the password
        await usersCollection.updateOne(
          { _id: testUser._id },
          { $set: { password: hashedPassword } }
        );
        
        console.log('Password added successfully');
      } else {
        // Test password match
        const isMatch = await bcrypt.compare(testPassword, testUser.password);
        console.log(`  Password matches 'Aditya@123': ${isMatch}`);
        
        if (!isMatch) {
          console.log('\nUpdating test user password...');
          
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(testPassword, salt);
          
          // Update the user with the password
          await usersCollection.updateOne(
            { _id: testUser._id },
            { $set: { password: hashedPassword } }
          );
          
          console.log('Password updated successfully');
        }
      }
    } else {
      console.log('\nTest user not found, creating one...');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      
      // Create the test user
      const newUser = {
        name: 'Aditya Sharma',
        email: testEmail,
        password: hashedPassword,
        trustScore: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await usersCollection.insertOne(newUser);
      console.log(`Test user created with ID: ${result.insertedId}`);
    }
    
    // Check Divya's user specifically
    const divyaEmail = 'divya.kumar@gmail.com';
    const divyaPassword = 'Divya@123';
    
    const divyaUser = await usersCollection.findOne({ email: divyaEmail });
    
    if (divyaUser) {
      console.log('\nDivya user found:');
      console.log(`  ID: ${divyaUser._id}`);
      console.log(`  Name: ${divyaUser.name}`);
      console.log(`  Email: ${divyaUser.email}`);
      
      // Test password match if password exists
      if (divyaUser.password) {
        const isMatch = await bcrypt.compare(divyaPassword, divyaUser.password);
        console.log(`  Password matches 'Divya@123': ${isMatch}`);
      } else {
        console.log('  Password: [MISSING]');
      }
    } else {
      console.log('\nDivya user not found');
    }
    
    await client.close();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers(); 