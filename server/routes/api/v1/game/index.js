import express from 'express';
import { users, games } from '../../../../models/index';
import jwt from 'jsonwebtoken';
const { jwtKey } = require('../../../../config');

const router = express.Router();

const authorize = async req => {
  if (req.headers.authorization) {
    if (
      req.headers.authorization.split(' ').shift().toLowerCase() === 'bearer'
    ) {
      try {
        let result = await users.findOne({
          where: {
            secret_id: jwt.verify(
              req.headers.authorization.split(' ').pop(),
              jwtKey
            ).secret_id
          }
        });
        if (result === null)
          return { status: 404, error: 'Invalid token was passed.' };
        else {
          return { status: 200, id: result.secret_id };
        }
      } catch (err) {
        return { status: 500, error: err.message };
      }
    } else {
      return { status: 400, error: 'Invalid token type' };
    }
  } else {
    return { status: 400, error: 'Authentication token not provided' };
  }
};

router.get('/list', async (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let results = await games.findAll({
    limit: 10,
    offset: page * 10,
    order: [['votes', 'DESC']]
  });
  res.json(
    results
      .map(x => x.toJSON())
      .map(x => {
        delete x.author;
        delete x.auth_token;
        return x;
      })
  );
});

router.get('/data/:id', async (req, res) => {
  if (isNaN(parseInt(req.params.id))) res.sendStatus(400);
  else {
    let userId;
    if (req.headers.authorization) {
      console.log('Authorizing!');
      userId = await authorize(req);
      console.log(userId);
    }
    let result = await games.findOne({
      where: {
        game_id: req.params.id
      }
    });
    if (result === null) res.status(404).json({ error: 'Game not found' });
    else {
      let gameData = result.toJSON();
      if (
        userId === undefined ||
        !(userId.status === 200 && userId.id === gameData.author)
      ) {
        delete gameData.author;
        delete gameData.auth_token;
      }
      res.status(200).json(gameData);
    }
  }
});

router.post('/new', async (req, res) => {
  await authorize(req);
});

export default router;
