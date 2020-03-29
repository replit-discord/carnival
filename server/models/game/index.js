// have no db to hit, just generate
export function GameModel(game) {}

GameModel.findByName = function (gameName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 'abcdefghijklmnopqrstuvwxyz'.indexOf(gameName) + 1,
        name: gameName, // hyphen case
        title: `the ${gameName}`, // name with spaces
        author: `author ${gameName}`,
        desc: `Fairly long description of the game ${gameName}, which gives a brief overview of things`,
        img: `/img/game-image/${gameName}.jpg`
      });
    }, 100);
  });
};

GameModel.findById = function (gameId) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const gameName = alphabet.charAt(gameId - 1);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 'abcdefghijklmnopqrstuvwxyz'.indexOf(gameName) + 1,
        name: gameName, // hyphen case
        title: `the ${gameName}`, // name with spaces
        author: `author ${gameName}`,
        desc: `Fairly long description of the game ${gameName}, which gives a brief overview of things`,
        img: `/img/game-image/${gameName}.jpg`
      });
    }, 100);
  });
};

GameModel.create = function () {
  return new GameModel();
};
