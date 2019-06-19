# PROJECT STRUCTURE

This is what I(@TheDrone7) was thinking of for how this project would work.

## GAMES

Since this a [repl.it](https://repl.it) community project, we could make it work this way: -

1. Create a new [repl.it](https://repl.it) account for carnival.
2. Whenever a user submits a game, they will need to provide a link to the repl which holds the source for the game (All the games must be open source).
3. The developer will be provided with a unique `TOKEN` which will then be used by the developers to implement the `CARNIVAL API` (which will be a REST API I will work on soon) after which they will complete the submission.
4. We will make sure that they implement the `CARNIVAL API` and then use their repl's output as the game if yes, otherwise, we will let the developer know if what's wrong and make them submit the game again, once they've fixed the reported issues.

## Accounts and signing in

There will be no required registration for carnival itself. People will be able to login using either of the 3 services listed below: -

1. Discord
2. GitHub
3. Google

Their will be no limits on the usernames, multiple people may have the same username. Users will be allowed to change their usernames in the future as well. Each user will be identified using their unique IDs. In the website, they will be recognized by their usernames but in the backend (behind the curtains), they will be identified by their IDs.

Their data such as their preferred settings and their scores in the various games will be stored in the repl.it database. The entire DB structure will be provided below.

---

## DB STRUCTURE

So the database structure is given below

```

CARNIVAL_DB

    - USERS TABLE
        - user_id               -- A unique number assigned to each user. (15 digit in length)
        - user_name             -- The username by which the user will be identified in the community
        - user_email            -- The user's email ID by which the user will be identified in the backend
        - user_games            -- An array of JSON objects which will hold the user's game data
                                -- The format for the JSON object provided below
        - user_preferences      -- A JSON object that holds the user's personalized settings
                                -- Format given below

    - GAMES TABLE
        - game_id               -- A unique number assigned to each game. (10 digit in length)
        - game_name             -- The game's name
        - game_owner            -- The email ID of the game owner
        - game_scores           -- An array of JSON Objects containing the scores of the gamers (for leaderboard)

```

**USER_GAME JSON FORMAT**

```json
{
  // The following three fields are compulsory

  "player_id": "NUMBER", // The player's unique ID (The auto-incremented integer)
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
