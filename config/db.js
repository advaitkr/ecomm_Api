const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/ecomm_db'; 

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async() => {
  console.log('Connected to MongoDB');
 
});

module.exports = db;