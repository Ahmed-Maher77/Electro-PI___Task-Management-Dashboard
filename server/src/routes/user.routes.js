import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
