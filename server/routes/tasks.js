const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get available tasks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // TODO: Implement task listing
    res.json({ message: 'Tasks endpoint' });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;