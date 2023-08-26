// routes/cart.js
const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Add a product to the cart
router.post('/add/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingCartItem = user.cart.find(item => item.product.equals(productId));

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// View the cart
router.get('/view', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.product');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update quantity of a cart item
router.put('/update/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingCartItem = user.cart.find(item => item.product.equals(productId));

    if (!existingCartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    existingCartItem.quantity = quantity || 1;
    await user.save();
    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Remove a product from the cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart = user.cart.filter(item => !item.product.equals(productId));
    await user.save();
    res.json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
