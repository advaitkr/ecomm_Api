const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
require('dotenv').config()
app.use(express.json());
app.use(bodyParser.json());
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/Product');
const fetchproductsRoutes = require('./routes/fetchproducts');
const ordersRoutes = require('./routes/orders');
const cartRoutes = require('./routes/carts');
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/fetchproducts',fetchproductsRoutes)
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });