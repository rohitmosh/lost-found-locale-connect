const LostItem = require('../models/LostItem');

// @desc    Get all lost items
// @route   GET /api/lost-items
// @access  Public
exports.getLostItems = async (req, res) => {
  try {
    const { 
      search, 
      category, 
      status, 
      lat, 
      lng, 
      radius = 5, // default radius in km
      sort = '-createdAt' // default sort by newest
    } = req.query;
    
    const query = {};
    
    // Search by text
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by location if coordinates are provided
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000 // convert km to meters
        }
      };
    }
    
    const lostItems = await LostItem.find(query)
      .sort(sort)
      .populate('userId', 'name profilePicture trustScore');
      
    res.status(200).json({
      success: true,
      count: lostItems.length,
      data: lostItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single lost item
// @route   GET /api/lost-items/:id
// @access  Public
exports.getLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id)
      .populate('userId', 'name profilePicture trustScore');
      
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        error: 'Lost item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lostItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new lost item
// @route   POST /api/lost-items
// @access  Private
exports.createLostItem = async (req, res) => {
  try {
    // Add user ID to request body
    req.body.userId = req.user.id;
    
    // Convert location to GeoJSON format
    if (req.body.locationCoords) {
      req.body.location = {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.locationCoords.lng),
          parseFloat(req.body.locationCoords.lat)
        ],
        address: req.body.location || ''
      };
      
      // Remove the old format properties
      delete req.body.locationCoords;
    }
    
    const lostItem = await LostItem.create(req.body);
    
    res.status(201).json({
      success: true,
      data: lostItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update lost item
// @route   PUT /api/lost-items/:id
// @access  Private
exports.updateLostItem = async (req, res) => {
  try {
    let lostItem = await LostItem.findById(req.params.id);
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        error: 'Lost item not found'
      });
    }
    
    // Make sure user is the owner
    if (lostItem.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this item'
      });
    }
    
    // Convert location to GeoJSON format if provided
    if (req.body.locationCoords) {
      req.body.location = {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.locationCoords.lng),
          parseFloat(req.body.locationCoords.lat)
        ],
        address: req.body.location || lostItem.location.address
      };
      
      // Remove the old format properties
      delete req.body.locationCoords;
    }
    
    // Update updatedAt timestamp
    req.body.updatedAt = Date.now();
    
    lostItem = await LostItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: lostItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete lost item
// @route   DELETE /api/lost-items/:id
// @access  Private
exports.deleteLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        error: 'Lost item not found'
      });
    }
    
    // Make sure user is the owner
    if (lostItem.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this item'
      });
    }
    
    await lostItem.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 