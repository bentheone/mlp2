const express = require('express');
const router = express.Router();

const { getAllBorrowings, storeBorrowing, updateBorrowing, deleteBorrowing } = require('../controllers/borrowingController');

router.route('/').get(getAllBorrowings).post(storeBorrowing);
router.route('/:id').update(updateBorrowing).delete(deleteBorrowing);