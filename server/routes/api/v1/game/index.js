import express from 'express';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';
const { jwtKey } = require('../../../../config');

const router = express.Router();

const dbClient = new Client();
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

router.post('/:id', authorize, (req, res) => {});
