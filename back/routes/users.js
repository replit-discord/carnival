var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config');

const dbPool = new Pool({
  connectionString: `postgres://postgres:root@localhost:5432/carnival_db`
});
dbPool.connect().catch(e => {
  console.error(e);
  process.exit(5);
});

const authorize = (req, res, next) => {
  if (req.headers.authorization && req.body['username']) {
    if (req.headers.authorization.split(' ').shift() == 'Bearer') {
      dbPool
        .query(
          `SELECT user_name FROM users WHERE secret_id='${
            jwt.verify(req.headers.authorization.split(' ').pop(), jwtKey)[
              'secret_id'
            ]
          }';`
        )
        .then(result => {
          if (result.rowCount > 0) {
            if (result.rows[0]['user_name'] == req.body['username']) {
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

router.get('/is-authorized', function(req, res, next) {
  if (req.cookies['token']) {
    dbPool
      .query(
        `SELECT * FROM users where secret_id='${
          jwt.verify(req.cookies['token'], jwtKey)['secret_id']
        }';`
      )
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
  if (req.body['userEmail'])
    await dbPool
      .query(
        `UPDATE users SET user_email='${
          req.body['userEmail']
        }' WHERE user_name='${req.body['username']}';`
      )
      .catch(err => {
        res.status(500).json({
          error: err.message,
          code: err.code
        });
      });

  if (req.body['userPreferences']) {
    console.log(JSON.stringify(req.body['userPreferences']));
    await dbPool
      .query(
        `UPDATE users SET user_preferences='${JSON.stringify(
          req.body['userPreferences']
        )}' WHERE user_name='${JSON.stringify(req.body['username'])}';`
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

router.get('/check/:username', function(req, res) {
  dbPool
    .query(
      `SELECT user_email FROM users WHERE user_name='${
        req.params['username']
      }';`
    )
    .then(result => {
      if (result.rowCount > 0) res.send('true');
      else res.send('false');
    })
    .catch(console.error);
});

module.exports = router;
