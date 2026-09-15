import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import User from '../lib/db/models/User';

dotenv.config({ path: '.env.local' });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const existingOwner = await User.findOne({ role: 'owner' });
    if (existingOwner) {
      console.log('Owner user already exists');
    } else {
      const owner = await User.create({
        email: 'admin@evolveacademy.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'owner',
      });
      console.log('Owner user created successfully!');
      console.log('Email:', owner.email);
      console.log('Password: admin123');
      console.log('⚠️  Change this password immediately after first login!');
    }

    console.log('Seeding complete! Run "npm run seed:course" next to populate the courses.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
