import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('ADMIN_PASSWORD must be at least 8 characters.');
    process.exit(1);
  }

  await connectDB();
  if (mongoose.connection.readyState !== 1) {
    console.error('Could not reach the database. Check MONGO_URI.');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    existing.password = password; // re-hashed by the pre-save hook
    await existing.save();
    console.log(`Password updated for ${email}.`);
  } else {
    await Admin.create({ email, password });
    console.log(`Admin created: ${email}`);
  }

  console.log('Remove ADMIN_PASSWORD from .env once you have signed in.');
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
