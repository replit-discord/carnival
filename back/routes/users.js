var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const dbPool = new Pool({
  connectionString: `postgres://postgres:root@localhost:5432/carnival_db`
});
dbPool.connect().catch(e => {
  console.error(e);
  process.exit(5);
});

/* GET users listing. */
router.get('/isAuthorized', function(req, res, next) {
  if (req.cookies['userIn']) {
    dbPool
      .query(`SELECT * FROM users where user_email='${req.cookies['userIn']}';`)
      .then(result => {
        if (result.rowCount > 0) {
          res.send(result.rows[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(502);
  }
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
