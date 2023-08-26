// routes/products.js
const express = require('express');
const Products = require('../models/Products');
const router = express.Router();

router.get('/by-category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Products.find({ category: categoryId })
      .select('name price description availability')
      .populate('category', 'name'); // Populate the associated category's name

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
