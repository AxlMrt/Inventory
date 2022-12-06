const express = require('express');
const router = express.Router();

const {
  productList,
  getAllProducts,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/product').get(productList)

module.exports = router;
