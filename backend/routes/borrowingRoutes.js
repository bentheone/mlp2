const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const { getAllBorrowings, storeBorrowing, updateBorrowing, deleteBorrowing } = require('../controllers/borrowingController');

router.route('/').get(protect, getAllBorrowings).post(protect, storeBorrowing);
router.route('/:id').put(protect, updateBorrowing).delete(protect, deleteBorrowing);

module.exports = router;