import express from 'express';

import authRouter from './auth';
import gameRouter from './game';
import userRouter from './user';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/game', gameRouter);
router.use('/user', userRouter);

export default router;
