import express from 'express';

import { gameController } from '../../../../controllers/gameController';

const gameRouter = express.Router();

gameRouter.get('/:game', gameController);

export default gameRouter;
