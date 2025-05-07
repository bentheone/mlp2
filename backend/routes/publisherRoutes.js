const express = require('express');
const router = express.Router();

const protected = require('../middleware/authMiddleware');
const { getAllPublishers, storePublisher, updatePublisher, deletePublisher } = require('../controllers/publisherController');

router.route('/').get(getAllPublishers).post(protected, storePublisher);
router.route('/:id').update(protected, updatePublisher).delete(protected, deletePublisher);