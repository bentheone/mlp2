const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const {getAllBooks, storeBook, updateBook, deleteBook} = require('../controllers/bookController');

router.route('/').get(protect, getAllBooks).post(protect, storeBook);
router.route('/:id').put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;