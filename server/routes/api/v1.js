import path from 'path';
import express from 'express';

const router = express.Router();

// keeping it simple for now
router.get('/image/game/:game', (req, res) => {
  if(req.params.game === "rolling-sky") {
    res.sendFile(path.join(__dirname, "./rolling-sky.png"))
  }
});

router.get('/game/:gameId', (req, res) => {
  if(req.params.gameId === "1") {
    res.json({
      id: 1,
      nameId: "rolling-sky",
      name: "rolling sky"
    });
  }
});

export default router;
