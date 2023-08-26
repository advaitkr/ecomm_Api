// routes/products.js
const express = require('express');
const Product = require('../models/Products');
const router = express.Router();

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('category', 'name');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
