const express = require('express');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', adminAuth, async (req, res) => {
  try {
    // TODO: Implement admin user management
    res.json({ message: 'Admin users endpoint' });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;