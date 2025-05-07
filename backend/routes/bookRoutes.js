const express = requuire('express');
const router = express.Router();

const protected = require('../middleware/authMiddleware');
const {getAllBooks, storeBook, updateBook, deleteBook} = require('../controllers/bookController');

router.route('/').get(protected, getAllBooks).post(protected, storeBook);
router.route('/:id').update(protected, updateBook).delete(protected, deleteBook);