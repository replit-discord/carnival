CREATE DATABASE IF NOT EXISTS carnival;

\c carnival

CREATE TABLE IF NOT EXISTS USERS(
  id SERIAL,  -- for arranging
  username VARCHAR(20) NOT NULL PRIMARY KEY, -- can also make id primary key or remove the id field
  pass VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  games JSON []
);

/*
The games array can hold values in JSON format such as 
  {
    "game-name": "Some Game",
    "game-id": "SomeID",
    "high-score": PLAYER_HIGH_SCORE,
    "points-earned": POINTS_EARNED,
    "etc": "etc"
  }
*/

CREATE TABLE IF NOT EXISTS GAMES(
  id SERIAL PRIMARY KEY,
  game_name VARCHAR NOT NULL,
  owned_by VARCHAR NOT NULL, -- username or userId
  auth_token VARCHAR NOT NULL -- The auth token required to make changes, a simple algorithm for it's generation given below
)

/*
  A sample suggestion for generation of the auth_token

  Step 1: Generate a randomly generated 42-character-long string.
  Step 2: Append the username to the randomly generated string.
  Step 3: Append the game_id to make the string 64-character-long.
  Step 4: Apply some or the other encryption techinque (TripleDES or AES is recommended)
*/

-- The game-data will be stored in the games' own databases.
