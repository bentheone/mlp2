const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const {getAllRequests, storeRequest, updateRequest, deleteRequest} = require('../controllers/borrowingRequestController');

router.route('/').get(getAllRequests).post(protect, storeRequest);
router.route('/:id').put(protect, updateRequest).delete(protect, deleteRequest);

module.exports = router;