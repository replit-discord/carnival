import express from 'express';
import DiscoOauthClient from 'disco-oauth';
import { discoId, discoSecret, jwtKey } from '../../../../config';
import { users } from '../../../../models/index';
import uid from 'uid';
import jwt from 'jsonwebtoken';

const discoClient = new DiscoOauthClient(discoId, discoSecret);

const router = express.Router();

const defaultPreferences = { darkMode: true };

discoClient.setScopes('identify', 'email');

/* GET home page. */
router.get('/', function (req, res) {
  res.send('Authend');
});

router.get('/auth/:action/:provider', (req, res) => {
  switch (req.params.provider.toLowerCase()) {
    case 'discord':
      if (req.params.action === 'register')
        discoClient.setRedirect(
          'http://localhost:4000/api/v1/auth/register/discord'
        );
      else
        discoClient.setRedirect(
          'http://localhost:4000/api/v1/auth/login/discord'
        );
      res.redirect(discoClient.authCodeLink);
      break;
  }
});

router.get('/login/:provider', async (req, res) => {
  let k;
  let user;

  switch (req.params.provider.toLowerCase()) {
    case 'discord':
      if (!req.query.code)
        return res.status(400).json({ error: 'Bad request' });
      k = await discoClient.getAccess(req.query.code);
      user = await discoClient.getUser(k);
      if (user.emailId) {
        let result = await users.findOne({
          where: { user_email: user.emailId }
        });
        if (result === null) res.redirect('/');
        else {
          jwt.sign(result.toJSON(), jwtKey, (err, token) => {
            if (!err) res.cookie('token', token);
            res.redirect('/');
          });
        }
      } else {
        res.redirect('/');
      }
      break;
  }
});

router.get('/register/:provider', async (req, res) => {
  let k;
  let user;

  switch (req.params.provider.toLowerCase()) {
    case 'discord':
      k = await discoClient.getAccess(req.query.code);
      user = await discoClient.getUser(k);
      if (user.emailId) {
        let result = await users.findOne({
          where: { user_email: user.emailId }
        });

        if (result === null) {
          res.cookie('email', user.emailId);
          res.redirect('/final/');
        } else res.redirect('/');
      } else res.redirect('/');

      break;
  }
});

router.post('/final/submit', async (req, res) => {
  if (req.body.username && req.body.username !== '' && req.cookies.email) {
    let newId = uid();
    let result;
    console.log(JSON.stringify(defaultPreferences));
    try {
      result = await users.create({
        secret_id: newId,
        user_name: req.body.username,
        user_email: req.cookies.email,
        user_preferences: defaultPreferences
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'User already registered.'
      });
    }
    if (result !== null) {
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
  } else {
    res.status(405).json({
      success: false,
      error: 'Email ID or username not specified.'
    });
  }
});

export default router;
