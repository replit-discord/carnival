import express from 'express';
import { games } from '../../../../models/index';

const router = express.Router();

router.get('/list', async (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let results = await games.findAll({
    limit: 10,
    offset: page * 10,
    order: [['votes', 'DESC']]
  });
  res.json(results.map(x => x.toJSON()));
});

export default router;
