import express from 'express';
import { users } from '../../../../models/index';
import jwt from 'jsonwebtoken';
const { jwtKey } = require('../../../../config');

const router = express.Router();

const authorize = async (req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization && req.body.username) {
    if (req.headers.authorization.split(' ').shift() === 'Bearer') {
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
          res.status(404).json({ error: 'Invalid token was passed.' });
        else {
          if (result.user_name === req.body.username) next();
        }
      } catch (err) {
        res.status(500).json({
          error: err.message,
          code: err.code
        });
      }
    } else {
      res.status(400).json({ error: 'Invalid token type.' });
    }
  } else {
    res
      .status(400)
      .json({ error: 'Authentication token or username not provided.' });
  }
};

router.get('/is-authorized', async (req, res) => {
  if (req.cookies.token) {
    try {
      let result = await users.findOne({
        where: {
          secret_id: jwt.verify(req.cookies.token, jwtKey).secret_id
        }
      });
      if (result === null)
        res.status(404).json({
          user: null,
          error: 'User not found in DB.'
        });
      else res.send(result.toJSON());
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(401);
  }
});

router.post('/update-data', authorize, async (req, res) => {
  if (req.body.userEmail)
    await users
      .update(
        { user_email: req.body.userEmail },
        { where: { user_name: req.body.username } }
      )
      .catch(err => {
        res.status(500).json({
          error: err.message
        });
      });

  if (req.body.userPreferences) {
    await users
      .update(
        { user_preferences: req.body.userPreferences },
        { where: { user_name: req.body.username } }
      )
      .catch(err => {
        res.status(500).json({
          error: err.message,
          code: err.code
        });
      });
  }

  res.status(200).json({
    success: true
  });
});

router.get('/check/:username', (req, res) => {
  users
    .findOne({ where: { user_name: req.params.username } })
    .then(result => {
      if (result !== null) res.send('true');
      else res.send('false');
    })
    .catch(console.error);
});

export default router;
