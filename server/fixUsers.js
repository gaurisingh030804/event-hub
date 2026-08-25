const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const fixUsers = async () => {
  await connectDB();
  await User.deleteMany({ email: { $in: ['student@jss.com', 'society@jss.com'] } });
  console.log('Deleted old users');
  process.exit(0);
};

fixUsers();
