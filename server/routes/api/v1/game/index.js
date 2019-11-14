import express from 'express';

import {
  gameNameController,
  gameIdController,
  getPopularGamesController,
  getRandomsGamesController,
  getRandomGamesController
} from '../../../../controllers/gameController';

const gameRouter = express.Router();

gameRouter.get('/name/:name', gameNameController);
gameRouter.get('/id/:id', gameIdController);
gameRouter.get('/popular', getPopularGamesController);
gameRouter.get('/randoms', getRandomsGamesController);
gameRouter.get('/random', getRandomGamesController);

export default gameRouter;
