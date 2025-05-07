const express = require('express');
const router = express.Router();

const protected = require('../middleware/authMiddleware');
const { getAllSuppliers, storeSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

router.route('/').get(protected, getAllSuppliers).post(protected, storeSupplier);
router.route('/:id').update(protected, updateSupplier).delete(protected, deleteSupplier);