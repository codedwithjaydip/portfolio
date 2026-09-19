import Message from '../models/Message.js';
import { sendContactNotification } from '../services/mailer.js';

export async function submitMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const stored = await Message.create({ name, email, subject, message, ip: req.ip });

    // A mail failure must not lose the message — it is already saved.
    sendContactNotification({ name, email, subject, message }).catch((error) =>
      console.error(`Contact notification failed: ${error.message}`)
    );

    res.status(201).json({
      success: true,
      message: 'Message sent. I will get back to you soon.',
      data: { id: stored._id },
    });
  } catch (error) {
    next(error);
  }
}
