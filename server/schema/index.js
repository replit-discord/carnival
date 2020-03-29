import path from 'path';
import fs from 'fs';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let games;
try {
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/json/games.json'), 'utf8')
  );
  games = json.data.games;
} catch (err) {
  console.error(err);
}

const gameQuery = new GraphQLObjectType({
  name: 'GameQueryType',
  description: 'information for each carnival game',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    talk_url: { type: GraphQLString },
    author: { type: GraphQLString },
    repl: { type: GraphQLString },
    votes: { type: GraphQLInt }
  }
});

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'root query',
    fields: {
      games: {
        type: new GraphQLList(gameQuery),
        resolve(parent, args) {
          return games;
        }
      }
    }
  })
});
