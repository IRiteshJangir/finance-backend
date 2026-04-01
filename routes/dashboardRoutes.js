const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getRecentRecords
} = require('../controllers/dashboardController');


// All roles can view dashboard
router.get('/summary', protect, authorizeRoles('admin', 'analyst', 'viewer'), getSummary);
router.get('/categories', protect, authorizeRoles('admin', 'analyst'), getCategorySummary);
router.get('/monthly', protect, authorizeRoles('admin', 'analyst'), getMonthlyTrends);
router.get('/recent', protect, authorizeRoles('admin', 'analyst', 'viewer'), getRecentRecords);

module.exports = router;