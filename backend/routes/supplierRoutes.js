const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const { getAllSuppliers, storeSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

router.route('/').get(protect, getAllSuppliers).post(protect, storeSupplier);
router.route('/:id').put(protect, updateSupplier).delete(protect, deleteSupplier);

module.exports = router;