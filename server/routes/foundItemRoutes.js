const express = require('express');
const router = express.Router();

// Get all found items
router.get('/', (req, res) => {
  res.json({ message: 'Get all found items - To be implemented' });
});

// Get single found item
router.get('/:id', (req, res) => {
  res.json({ message: `Get found item ${req.params.id} - To be implemented` });
});

// Create found item
router.post('/', (req, res) => {
  res.json({ message: 'Create found item - To be implemented' });
});

// Update found item
router.put('/:id', (req, res) => {
  res.json({ message: `Update found item ${req.params.id} - To be implemented` });
});

// Delete found item
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete found item ${req.params.id} - To be implemented` });
});

module.exports = router; 