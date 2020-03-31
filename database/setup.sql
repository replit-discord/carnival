/* Create and connect to the database */
DROP DATABASE IF EXISTS carnival_db;
CREATE DATABASE carnival_db;

\c carnival_db;

/* Create tables */
CREATE TABLE IF NOT EXISTS users(
    secret_id VARCHAR,
    user_name VARCHAR,
    user_email VARCHAR PRIMARY KEY,
    user_games JSON [],
    user_preferences JSON,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);


CREATE TABLE IF NOT EXISTS games(
    game_id serial PRIMARY KEY,
    game_name VARCHAR,
    game_title VARCHAR, -- actual game title
    game_desc VARCHAR,
    talk_url VARCHAR, -- repl talk post link (optional)
    author VARCHAR, -- only the name of the repl
    game_owner VARCHAR, -- userId
    repl VARCHAR, -- replUsername
    votes INTEGER,
    game_scores JSON [],
    auth_token VARCHAR(64), -- fixed 64 characters long
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);
