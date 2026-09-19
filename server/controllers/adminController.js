import Admin from '../models/Admin.js';
import Message from '../models/Message.js';
import Project from '../models/Project.js';
import { signToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    // Same message either way so the endpoint does not reveal which emails exist.
    if (!admin || !(await admin.matchesPassword(password))) {
      throw new ApiError(401, 'Email or password is incorrect.');
    }

    admin.lastLoginAt = new Date();
    await admin.save({ validateBeforeSave: false });

    res.json({
      success: true,
      data: { token: signToken(admin._id), admin: { email: admin.email } },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({ success: true, data: { email: req.admin.email } });
}

export async function stats(req, res, next) {
  try {
    const [totalProjects, featuredProjects, totalMessages, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
    ]);
    res.json({ success: true, data: { totalProjects, featuredProjects, totalMessages, unreadMessages } });
  } catch (error) {
    next(error);
  }
}

export async function listMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function markMessageRead(req, res, next) {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read !== false },
      { new: true }
    );
    if (!message) throw new ApiError(404, 'That message does not exist.');
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) throw new ApiError(404, 'That message does not exist.');
    res.json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
}
