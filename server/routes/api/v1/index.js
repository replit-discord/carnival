import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import gameRouter from './game';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/game', gameRouter);

export default router;
