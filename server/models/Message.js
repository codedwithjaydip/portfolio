import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 140 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    read: { type: Boolean, default: false, index: true },
    ip: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
