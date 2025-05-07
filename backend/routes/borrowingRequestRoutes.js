const express = requuire('express');
const router = express.Router();

const {getAllRequests, storeRequest, updateRequest, deleteRequest} = require('../controllers/requestController');

router.get('/', getAllRequests).post('/', storeRequest);
router.post('/:id', updateRequest).delete('/:id', deleteRequest);