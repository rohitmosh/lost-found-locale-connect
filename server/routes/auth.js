const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware to check if user is authenticated
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db('lost_found_db');
    const usersCollection = db.collection('users');
    
    // Find user by ID
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // Remove password from user object
    delete user.password;
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db('lost_found_db');
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      trustScore: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(newUser);
    
    // Create JWT token
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const userData = {
      _id: result.insertedId,
      name,
      email,
      trustScore: 0
    };
    
    res.status(201).json({
      success: true,
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db('lost_found_db');
    const usersCollection = db.collection('users');
    
    // Find user by email
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      trustScore: user.trustScore || 0
    };
    
    res.json({
      success: true,
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Update user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db('lost_found_db');
    const usersCollection = db.collection('users');
    
    // Check if email is already taken by another user
    if (email && email !== req.user.email) {
      const existingUser = await usersCollection.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken.' });
      }
    }
    
    // Update user
    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      updatedAt: new Date()
    };
    
    await usersCollection.updateOne(
      { _id: new ObjectId(req.user._id) },
      { $set: updateData }
    );
    
    // Get updated user
    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(req.user._id) });
    
    // Remove password from user object
    delete updatedUser.password;
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Please provide current and new password.' });
    }
    
    // Connect to MongoDB
    await client.connect();
    const db = client.db('lost_found_db');
    const usersCollection = db.collection('users');
    
    // Find user by ID
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user._id) });
    
    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await usersCollection.updateOne(
      { _id: new ObjectId(req.user._id) },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );
    
    res.json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router; 