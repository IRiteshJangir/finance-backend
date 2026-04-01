const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');


// CREATE (Admin only)
router.post('/', protect, authorizeRoles('admin'), createRecord);

// READ (All roles)
router.get('/', protect, authorizeRoles('admin', 'analyst', 'viewer'), getRecords);
router.get('/:id', protect, authorizeRoles('admin', 'analyst', 'viewer'), getRecordById);

// UPDATE (Admin only)
router.patch('/:id', protect, authorizeRoles('admin'), updateRecord);

// DELETE (Admin only)
router.delete('/:id', protect, authorizeRoles('admin'), deleteRecord);

module.exports = router;