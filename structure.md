# PROJECT STRUCTURE


Also read the [wiki](https://github.com/repl-it-discord/carnival/wiki) for more information.

## GAMES

Since this a [repl.it](https://repl.it) community project, we will `probably` make it work this way: -

1. Create a new [repl.it](https://repl.it) account for carnival.
2. Whenever a user submits a game, they will need to provide a link to the repl which holds the source for the game (All games must be open source).
3. The developer will be provided with a unique `TOKEN` which will then be used by them to implement the `CARNIVAL API` (which will be a REST API I will work on soon) after which the developer will complete the submission.
4. We will make sure that they implement the `CARNIVAL API` and then use their repl's output as the game if the developer did follow the steps. Otherwise, we will let the developer know what's wrong and make them submit the game again, once they've fixed the reported issues.

## Accounts and signing in

There will be no required registration for carnival itself. People will be able to login using either of the 3 services listed below: -

1. Discord
2. GitHub
3. Google

In the website, they will be recognized by their usernames but in the backend  , they will be identified by their email IDs.

Their data such as their preferred settings and their scores in the various games will be stored in the repl.it database. The entire DB structure will be provided below.

---

## DB STRUCTURE

As  mentioned above, the data structure:

```
CARNIVAL_DB

    - USERS TABLE
        - secret_id             -- The special unique user_id to for security.
        - user_name             -- The username by which the user will be identified in the community.
                                -- The user will be allowed to set it when they register and no modifications will be allowed in the future.
        - user_email            -- The user's email ID by which the user will be identified in the backend
        - user_games            -- An array of JSON objects which will hold the user's game data
                                -- The format for the JSON object provided below
        - user_preferences      -- A JSON object that holds the user's personalized settings
                                -- Format given below

    - GAMES TABLE
        - game_id               -- A unique ID generated for the game.
        - game_name             -- The game's name
        - game_owner            -- The email ID of the game owner
        - game_scores           -- An array of JSON Objects containing the scores of the gamers (for leaderboard)
```

**USER_GAME JSON FORMAT**

```json
{
  // The following three fields are compulsory

  "player_id": "NUMBER", // The player's unique ID
  "player_name": "STRING", // The player's username
  "high_score": "NUMBER", // The player's highest score

  // The following is an optional field

  "custom_data": {
    // Some custom save_data the developer might need to save
  }
}
```

**USER_PREFERENCES JSON OBJECT**

```json
{
  "darkMode": "BOOLEAN" // Whether the user wants to use the dark theme or the light theme. (TRUE by default)
}
```

**GAME_SCORE OBJECT**

This will be the same as `USER_GAME JSON OBJECT` with the exception of no custom_data.

---

## Authentication process

On clicking the login/register button, the user will be redirected to the OAuth page for authorization.
When their data has been fetched from any of these identity providers,their email will be used to fetch their `secret_id` which will then be encoded and signed and finally converted to a JSON Web Token which will then be saved in a cookie named `userIn`,
which will then be used for authentication while making requests to the server.

---

## ENV file

To keep some data safe, it will be kept in a `.env` file. Before you start the backend server, be sure to create one and save the following data in it.

```
discoId=577424847202680832
discoSecret=YH2wuqfV9_a8ckxAgtibYxZHIqMY10LT
jwtKey=<place a key of your choice here>
```

Of course, you'll have to replace `<place some random key here>` with a key of your own choice but without spaces. We are using specific discord ID and Secret because the ones whose ID and secret are provided is configured for proper functioning of carnival.
