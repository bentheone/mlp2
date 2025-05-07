const express = requuire('express');
const router = express.Router();

const protected = require('../middleware/authMiddleware');
const {getAllRequests, storeRequest, updateRequest, deleteRequest} = require('../controllers/requestController');

router.route('/').get(getAllRequests).post(protected, storeRequest);
router.route('/:id').update(protected, updateRequest).delete(protected, deleteRequest);