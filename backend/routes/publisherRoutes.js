const express = require('express');
const router = express.Router();

const { getAllPublishers, storePublisher, updatePublisher, deletePublisher } = require('../controllers/publisherController');

router.route('/').get(getAllPublishers).post(storePublisher);
router.route('/:id').update(updatePublisher).delete(deletePublisher);