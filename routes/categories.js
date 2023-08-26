// routes/categories.js
const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
