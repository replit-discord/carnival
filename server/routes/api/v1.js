import express from 'express';

import { gameController } from '../../controllers/gameController';

const router = express.Router();

router.get('/game/:game', gameController);

export default router;
