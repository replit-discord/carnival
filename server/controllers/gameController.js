import httpStatus from 'http-status-codes';

import { getGameByName, getGameById } from '../services/gameService';

export function gameNameController(req, res) {
  const gameName = req.params.name;
  if(gameName.length === 1 && 'abcdefghijklmnopqrstuvwxyz'.includes(gameName)) {
    getGameByName(gameName)
      .then(game => {
        res.json(game);
      })
      .catch(err => {
        console.error(err);
        res.send(httpStatus.INTERNAL_SERVER_ERROR);
      });
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
}

export function gameIdController(req, res) {
  const gameId = parseInt(req.params.id);
  if(gameId > -1 && gameId < 27) {
    getGameById(gameId)
      .then(game => {
        res.json(game);
      })
      .catch(err => {
        console.error(err);
        res.send(httpStatus.INTERNAL_SERVER_ERROR);
      });
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
}

export function getPopularGamesController(req, res) {
  const popularGameList = ['a', 'b', 'd', 'f', 'o', 'x'];
  const promises = [];

  popularGameList.forEach(gameName => {
    const promise = getGameByName(gameName);
    promises.push(promise);
  });

  Promise.all(promises)
    .then(popularGames => {
      res.send({
        data: popularGames
      });
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    })
}

export function getRandomsGamesController(req, res) {
  const randomLength = 10;
  const promises = [];

  for(let i = 0; i < 10; i++) {
    const random = Math.random() * 26 + 1;
    const promise = getGameById(random);
    promises.push(promise);
  }

  Promise.all(promises)
    .then(randomGames => {
      res.json({
        data: randomGames
      });
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    });
}

export function getRecentlyAddedController(req, res) {
  const popularGameList = ['p', 'a', 'f', 'a', 'q', 'i'];
  const promises = [];

  popularGameList.forEach(gameName => {
    const promise = getGameByName(gameName);
    promises.push(promise);
  });

  Promise.all(promises)
    .then(popularGames => {
      res.send({
        data: popularGames
      });
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    })
}

export function getMostLikedController(req, res) {
  const popularGameList = ['b', 'e', 'x', 'x', 'y', 'z'];
  const promises = [];

  popularGameList.forEach(gameName => {
    const promise = getGameByName(gameName);
    promises.push(promise);
  });

  Promise.all(promises)
    .then(popularGames => {
      res.send({
        data: popularGames
      });
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    })
}

export function getMostPlayedController(req, res) {
  const popularGameList = ['p', 'g', 'e', 'e', 'a', 'x'];
  const promises = [];

  popularGameList.forEach(gameName => {
    const promise = getGameByName(gameName);
    promises.push(promise);
  });

  Promise.all(promises)
    .then(popularGames => {
      res.send({
        data: popularGames
      });
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    })
}

export function getRandomGamesController(req, res) {
  const random = Math.random() * 26 + 1;
  getGameById(random)
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      console.error(err);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
    });
}

