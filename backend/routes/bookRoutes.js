const express = requuire('express');
const router = express.Router();

const {getAllBooks, storeBook, updateBook, deleteBook} = require('../controllers/bookController');

router.get('/', getAllBooks).post('/', storeBook);
router.post('/:id', updateBook).delete('/:id', deleteBook);