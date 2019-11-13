import { GameModel } from '../models/game';

export function gameController(req, res) {
  const gameName = req.params.game;
  if(gameName.length === 1 && 'abcdefghijklmnopqrstuvwxyz'.includes(gameName)) {
    GameModel.findByName(gameName)
      .then(game => {
        res.json(game);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.send(404);
  }
}
