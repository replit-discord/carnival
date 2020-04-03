import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:root@localhost:5432/carnival_db',
  { logging: false }
);
sequelize.authenticate().catch(err => {
  console.error('Could not connect to the database.\n', err);
});

const users = sequelize.define(
  'users',
  {
    secret_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_email: { type: DataTypes.STRING, primaryKey: true },
    user_games: DataTypes.ARRAY(DataTypes.STRING),
    user_preferences: DataTypes.JSON
  },
  {
    freezeTableName: true
  }
);
const games = sequelize.define(
  'games',
  {
    game_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    game_name: DataTypes.STRING,
    game_title: DataTypes.STRING,
    game_desc: DataTypes.STRING,
    talk_url: DataTypes.STRING,
    author: DataTypes.STRING,
    game_owner: DataTypes.STRING,
    repl: DataTypes.STRING,
    votes: DataTypes.ARRAY(DataTypes.STRING),
    game_data: DataTypes.ARRAY(DataTypes.JSON),
    auth_token: { type: DataTypes.STRING, validate: { min: 64, max: 64 } }
  },
  {
    freezeTableName: true
  }
);

users.sync({ alter: true });
games.sync({ alter: true });

export { users, games };
