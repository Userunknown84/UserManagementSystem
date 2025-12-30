const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const createAdmin = async () => {
  try {
   
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in .env file');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

   
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      
      
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('User updated to admin');
      }
    } else {
      const admin = await User.create({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123456',
        role: 'admin',
        status: 'active'
      });
      console.log('Admin created successfully:', admin.email);
    }
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
