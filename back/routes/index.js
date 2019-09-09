var express = require('express');
var router = express.Router();
const { discoId, discoSecret } = require('../config');
const discoOAuthClient = require('disco-oauth');
const { Pool } = require('pg');
const discoClient = new discoOAuthClient(discoId, discoSecret);

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
          .query(`SELECT * FROM users WHERE user_email='${user.email}'`)
          .then(returnedUser => {
            if (!(returnedUser.rowCount > 0)) {
              res.cookie('error', 'user not registered', { maxAge: 10000 });
              res.redirect('/');
            } else {
              res.cookie('userIn', user.email);
              res.redirect('/home/');
            }
          });
      } else {
        res.redirect('/error/no-email');
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
          .query(`SELECT * FROM users WHERE user_email='${user.email}'`)
          .then(returnedUser => {
            if (!(returnedUser.rowCount > 0)) {
              res.cookie('email', user.email);
              res.redirect('/username/');
            } else {
              res.cookie('error', 'user already registered', { maxAge: 10000 });
              res.redirect('/');
            }
          });
      } else {
        res.redirect('/error/no-email');
      }
      break;

    default:
      if (req.params['provider'] && req.params['provider'] !== '') {
        dbPool
          .query(
            `INSERT INTO users(user_name, user_email, user_preferences) VALUES ('${
              req.params['provider']
            },'${req.cookies['email']}','${JSON.stringify(
              defaultPreferences
            )}')`
          )
          .then(result => {
            res.cookie('userIn', req.cookies['email']);
            res.clearCookie('email');
            res.redirect('/home/');
          });
      }
      break;
  }
});

module.exports = router;
