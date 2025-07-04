const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['electronics', 'clothing', 'jewelry', 'documents', 'keys', 'pets', 'other']
  },
  lostDate: {
    type: Date,
    default: Date.now
  },
  notSureWhen: {
    type: Boolean,
    default: false
  },
  photo: {
    type: String,
    default: null
  },
  contactEmail: {
    type: String,
    required: [true, 'Please provide a contact email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  contactPhone: {
    type: String,
    default: ''
  },
  allowNotifications: {
    type: Boolean,
    default: true
  },
  hideContactInfo: {
    type: Boolean,
    default: false
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    address: {
      type: String,
      default: ''
    }
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'expired'],
    default: 'active'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
LostItemSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('LostItem', LostItemSchema); 