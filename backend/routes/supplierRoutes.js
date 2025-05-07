const express = require('express');
const router = express.Router();

const { getAllSuppliers, storeSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

router.route('/').get(getAllSuppliers).post(storeSupplier);
router.route('/:id').update(updateSupplier).delete(deleteSupplier);