import express from 'express';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';
const { jwtKey } = require('../../../../config');

const router = express.Router();

const dbClient = new Client({
  connectionString: `postgres://postgres:root@localhost:5432/carnival_db`
});
dbClient.connect().catch(err => {
  console.error('could not connect to db', err);
});

const authorize = (req, res, next) => {
  if (req.headers.authorization && req.body.username) {
    if (req.headers.authorization.split(' ').shift() === 'Bearer') {
      dbClient
        .query(`SELECT user_name FROM users WHERE secret_id=$1;`, [
          jwt.verify(req.headers.authorization.split(' ').pop(), jwtKey)
            .secret_id
        ])
        .then(result => {
          if (result.rowCount > 0) {
            if (result.rows[0].user_name === req.body.username) {
              next();
            } else {
              res.status(404).json({ error: 'Invalid credentials provided.' });
            }
          } else {
            res.status(404).json({ error: 'Invalid token was passed.' });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: err.message,
            code: err.code
          });
        });
    } else {
      res.status(400).json({ error: 'Invalid token type.' });
    }
  } else {
    res
      .status(400)
      .json({ error: 'Authentication token or username not provided.' });
  }
};

router.get('/is-authorized', function (req, res, next) {
  if (req.cookies.token) {
    dbClient
      .query(`SELECT * FROM users where secret_id=$1;`, [
        jwt.verify(req.cookies.token, jwtKey).secret_id
      ])
      .then(result => {
        if (result.rowCount > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).json({
            user: null,
            error: 'User not found in DB.'
          });
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

router.post('/update-data', authorize, async (req, res) => {
  if (req.body.userEmail)
    await dbClient
      .query(`UPDATE users SET user_email=$1 WHERE user_name=$2;`, [
        req.body.userEmail,
        req.body.username
      ])
      .catch(err => {
        res.status(500).json({
          error: err.message,
          code: err.code
        });
      });

  if (req.body.userPreferences) {
    console.log(JSON.stringify(req.body.userPreferences));
    await dbClient
      .query(`UPDATE users SET user_preferences=$1::json WHERE user_name=$2;`, [
        JSON.stringify(req.body.userPreferences),
        req.body.username
      ])
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

router.get('/check/:username', function (req, res) {
  dbClient
    .query(`SELECT user_email FROM users WHERE user_name=$1;`, [
      req.params.username
    ])
    .then(result => {
      if (result.rowCount > 0) res.send('true');
      else res.send('false');
    })
    .catch(console.error);
});

export default router;
