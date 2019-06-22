var express = require('express');
var router = express.Router();
const { discoId, discoSecret, jwtKey } = require('../config');
const discoOAuthClient = require('disco-oauth');
const { Pool } = require('pg');
const discoClient = new discoOAuthClient(discoId, discoSecret);

const shortid = require('shortid');
const jwt = require('jsonwebtoken');

let defaultPreferences = {
  darkMode: true
};

const dbPool = new Pool({
  connectionString: `postgres://postgres:root@localhost:5432/carnival_db`
});
dbPool.connect().catch(e => {
  console.error(e);
  process.exit(5);
});

discoClient.setScopes(['identify', 'email']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/:action/:provider', (req, res) => {
  switch (req.params['provider'].toLowerCase()) {
    case 'discord':
      if (req.params['action'] == 'register')
        discoClient.setRedirect('http://localhost:3000/register/discord');
      else discoClient.setRedirect('http://localhost:3000/login/discord');
      res.redirect(discoClient.getAuthCodeLink());
      break;
  }
});

router.get('/login/:provider', async (req, res) => {
  switch (req.params['provider'].toLowerCase()) {
    case 'discord':
      let k = await discoClient.getAccess(req.query.code);
      let user = await discoClient.getAuthorizedUser(k);
      if (user.email) {
        dbPool
          .query(`SELECT secret_id FROM users WHERE user_email='${user.email}'`)
          .then(returnedUser => {
            if (!(returnedUser.rowCount > 0)) {
              res.redirect('/');
            } else {
              jwt.sign(returnedUser.rows[0], jwtKey, (err, token) => {
                if (!err) res.cookie('token', token);
                res.redirect('/');
              });
            }
          });
      } else {
        res.redirect('/');
      }
      break;
  }
});

router.get('/register/:provider', async (req, res) => {
  switch (req.params['provider'].toLowerCase()) {
    case 'discord':
      let k = await discoClient.getAccess(req.query.code);
      let user = await discoClient.getAuthorizedUser(k);
      if (user.email) {
        dbPool
          .query(`SELECT secret_id FROM users WHERE user_email='${user.email}'`)
          .then(returnedUser => {
            if (!(returnedUser.rowCount > 0)) {
              res.cookie('email', user.email);
              res.redirect('/final/');
            } else {
              res.redirect('/');
            }
          });
      } else {
        res.redirect('/');
      }
      break;
  }
});

router.post('/final/submit', (req, res) => {
  if (
    req.body['username'] &&
    req.body['username'] !== '' &&
    req.cookies['email']
  ) {
    var newId = shortid.generate();
    dbPool
      .query(
        `INSERT INTO users(secret_id, user_name, user_email, user_preferences)
                  VALUES('${newId}', '${req.body['username']}', '${
          req.cookies['email']
        }', '${JSON.stringify(defaultPreferences)}')`
      )
      .then(result => {
        if (result.rowCount > 0) {
          jwt.sign({ secret_id: newId }, jwtKey, (err, token) => {
            if (!err) {
              console.log(token.length);
              res.cookie('token', token);
              res.status(201).json({
                success: true
              });
            } else {
              res.status(500).json({
                success: false,
                error: 'Unable to sign the secret.'
              });
            }
          });
        } else {
          res.status(500).json({
            success: false,
            error: 'Unable to insert into DB.'
          });
        }
      })
      .catch(err => {
        res.status(502).json({
          success: false,
          error: err.message,
          code: err.code
        });
      });
  } else {
    res.status(405).json({
      success: false,
      error: 'Email ID or username not specified.'
    });
  }
});

module.exports = router;
