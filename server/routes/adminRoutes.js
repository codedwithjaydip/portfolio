import { Router } from 'express';
import { body } from 'express-validator';
import {
  login,
  me,
  stats,
  listMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/adminController.js';
import {
  createProject,
  updateProject,
  deleteProject,
  listProjects,
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post(
  '/login',
  loginLimiter,
  [
    body('email').trim().isEmail().withMessage('Enter a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Enter your password.'),
  ],
  validate,
  login
);

router.use(requireAdmin);

router.get('/me', me);
router.get('/stats', stats);

router.get('/projects', listProjects);
router.post(
  '/projects',
  [
    body('title').trim().notEmpty().withMessage('Add a title.'),
    body('shortDescription').trim().notEmpty().withMessage('Add a short description.'),
    body('description').trim().notEmpty().withMessage('Add a description.'),
  ],
  validate,
  createProject
);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.get('/messages', listMessages);
router.patch('/messages/:id/read', markMessageRead);
router.delete('/messages/:id', deleteMessage);

export default router;
