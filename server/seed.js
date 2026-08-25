const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');
const Event = require('./models/Event');

const seedData = async () => {
  await connectDB();

  await User.create([
    {
      name: 'Student User',
      email: 'student@jss.com',
      password: '123456',
      role: 'student'
    },
    {
      name: 'Tech Society',
      email: 'society@jss.com',
      password: '123456',
      role: 'society',
      societyName: 'Tech Society'
    }
  ]);

  console.log('Seed data created successfully');
  process.exit(0);
};

seedData();