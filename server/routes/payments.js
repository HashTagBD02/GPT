const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/payments
// @desc    Get payment history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // TODO: Implement payment history
    res.json({ message: 'Payments endpoint' });
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;