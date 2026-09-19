import { Router } from 'express';
import { body } from 'express-validator';
import { submitMessage } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Enter your name.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Enter a valid email address.'),
    body('subject').trim().isLength({ min: 3, max: 140 }).withMessage('Add a short subject.'),
    body('message')
      .trim()
      .isLength({ min: 20, max: 4000 })
      .withMessage('Your message needs at least 20 characters.'),
    body('company').optional().isEmpty().withMessage('Rejected.'), // honeypot
  ],
  validate,
  submitMessage
);

export default router;
