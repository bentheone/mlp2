const express = require('express');
const router = express.Router();

const protected = require('../middleware/authMiddleware');
const { getAllBorrowings, storeBorrowing, updateBorrowing, deleteBorrowing } = require('../controllers/borrowingController');

router.route('/').get(protected, getAllBorrowings).post(protected, storeBorrowing);
router.route('/:id').update(protected, updateBorrowing).delete(protected, deleteBorrowing);