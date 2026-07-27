import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import { validateMiddleware } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerValidator, validateMiddleware, register);
router.post('/login', loginValidator, validateMiddleware, login);
router.get('/me', authMiddleware, getMe);

export default router;
