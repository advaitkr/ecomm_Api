// routes/orders.js
const express = require('express');
const Order = require('../models/Orders');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/place-order', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.product');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total price
    let total = 0;
    user.cart.forEach(item => {
      total += item.product.price * item.quantity;
    });

    // Create the order
    const order = new Order({
      user: req.userId,
      products: user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
    });

    await order.save();

    // Clear the user's cart
    user.cart = [];
    await user.save();

    res.json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/order-history', authMiddleware, async (req, res) => {
    try {
      const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

router.get('/:orderId', authMiddleware, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId)
      .populate('user', 'username')
      .populate('products.product', 'name price'); // Populate user and product details

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;


module.exports = router;
