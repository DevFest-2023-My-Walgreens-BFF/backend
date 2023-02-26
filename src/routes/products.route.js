const express = require('express');
const router = express.Router();

const ProductController = require('../architecture/controllers/products.controller');
const productController = new ProductController();

router.get('/medicines', productController.findMedicines);
router.get('/:medicineId', productController.findOneMedicine);

module.exports = router;
