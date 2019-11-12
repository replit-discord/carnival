import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser'
const logger = require('morgan')

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import apiRouter from './routes/api'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

export default app;
