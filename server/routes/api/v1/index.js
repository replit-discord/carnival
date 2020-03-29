import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
