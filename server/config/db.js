import mongoose from 'mongoose';

let connected = false;

export const isDbConnected = () => connected && mongoose.connection.readyState === 1;

/**
 * Connects to MongoDB. The API is designed to keep serving cached/fallback
 * data if this fails, so a database outage degrades the site instead of
 * taking it down.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not set — starting without a database.');
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    connected = true;
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    connected = false;
    console.error(`MongoDB connection failed: ${error.message}`);
  }

  mongoose.connection.on('disconnected', () => {
    connected = false;
    console.warn('MongoDB disconnected.');
  });
  mongoose.connection.on('connected', () => {
    connected = true;
  });

  return connected;
}
