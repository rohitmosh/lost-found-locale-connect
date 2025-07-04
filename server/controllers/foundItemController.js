const FoundItem = require('../models/FoundItem');

// @desc    Get all found items
// @route   GET /api/found-items
// @access  Public
exports.getFoundItems = async (req, res) => {
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
    
    const foundItems = await FoundItem.find(query)
      .sort(sort)
      .populate('userId', 'name profilePicture trustScore');
      
    res.status(200).json({
      success: true,
      count: foundItems.length,
      data: foundItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single found item
// @route   GET /api/found-items/:id
// @access  Public
exports.getFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id)
      .populate('userId', 'name profilePicture trustScore');
      
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        error: 'Found item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: foundItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new found item
// @route   POST /api/found-items
// @access  Private
exports.createFoundItem = async (req, res) => {
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
    
    const foundItem = await FoundItem.create(req.body);
    
    res.status(201).json({
      success: true,
      data: foundItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update found item
// @route   PUT /api/found-items/:id
// @access  Private
exports.updateFoundItem = async (req, res) => {
  try {
    let foundItem = await FoundItem.findById(req.params.id);
    
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        error: 'Found item not found'
      });
    }
    
    // Make sure user is the owner
    if (foundItem.userId.toString() !== req.user.id) {
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
        address: req.body.location || foundItem.location.address
      };
      
      // Remove the old format properties
      delete req.body.locationCoords;
    }
    
    // Update updatedAt timestamp
    req.body.updatedAt = Date.now();
    
    foundItem = await FoundItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: foundItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete found item
// @route   DELETE /api/found-items/:id
// @access  Private
exports.deleteFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);
    
    if (!foundItem) {
      return res.status(404).json({
        success: false,
        error: 'Found item not found'
      });
    }
    
    // Make sure user is the owner
    if (foundItem.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this item'
      });
    }
    
    await foundItem.remove();
    
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