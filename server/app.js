import path from 'path';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import cookieParser from 'cookie-parser';

import { rootSchema } from './schema';
import apiRouter from './routes/api';
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootSchema,
    graphiql: process.env.NODE_ENV === 'development'
  })
);
app.use('/api', apiRouter);

export default app;
