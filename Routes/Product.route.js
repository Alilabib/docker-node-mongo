const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.controller');

router.get('/',ProductController.getAllProducts);
router.post('/',ProductController.createNewProduct);
router.get('/:id',ProductController.findProductById);
router.patch('/:id',ProductController.updateProduct);
router.delete('/:id',ProductController.deleteProduct);


module.exports = router;