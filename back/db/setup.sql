/* Create and connect to the database */
CREATE DATABASE IF NOT EXISTS carnivalDb;

\c carnivalDb;

/* Create tables */
CREATE TABLE IF NOT EXISTS users(
    userId SERIAL, 
    username VARCHAR, 
    userEmail VARCHAR PRIMARY KEY,
    userGames JSON []
)

CREATE TABLE IF NOT EXISTS games(
    gId SERIAL, 
    gName VARCHAR, 
    gOwner VARCHAR, -- userId
    gScores JSON [], 
    authToken VARCHAR(64)
)