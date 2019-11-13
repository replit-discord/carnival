import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
const logger = require('morgan');

import apiRouter from './routes/api';

const isDev = process.env.NODE_ENV === 'development';
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

export default app;
