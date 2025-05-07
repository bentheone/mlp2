const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const { getAllPublishers, storePublisher, updatePublisher, deletePublisher } = require('../controllers/publisherController');

router.route('/').get(getAllPublishers).post(protect, storePublisher);
router.route('/:id').put(protect, updatePublisher).delete(protect, deletePublisher);

module.exports = router;