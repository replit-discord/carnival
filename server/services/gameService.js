import { GameModel } from '../models/game';

export function getGameByName(gameName) {
  return GameModel.findByName(gameName);
}

export function getGameById(gameId) {
  return GameModel.findById(gameId);
}
