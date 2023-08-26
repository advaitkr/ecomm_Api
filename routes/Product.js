// routes/products.js
const express = require('express');
const Product = require('../models/Products');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    
    const product = new Product({ name, price, category: categoryId });
    await product.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
