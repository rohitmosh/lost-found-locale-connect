const express = require('express');
const router = express.Router();

// Get all lost items
router.get('/', (req, res) => {
  res.json({ message: 'Get all lost items - To be implemented' });
});

// Get single lost item
router.get('/:id', (req, res) => {
  res.json({ message: `Get lost item ${req.params.id} - To be implemented` });
});

// Create lost item
router.post('/', (req, res) => {
  res.json({ message: 'Create lost item - To be implemented' });
});

// Update lost item
router.put('/:id', (req, res) => {
  res.json({ message: `Update lost item ${req.params.id} - To be implemented` });
});

// Delete lost item
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete lost item ${req.params.id} - To be implemented` });
});

module.exports = router; 