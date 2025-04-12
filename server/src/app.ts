import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';

import data from '../../src/assets/data.json';
import users from '../../src/assets/users.json';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: "Available routes are /data, /users, and /update",
  });
});

app.get('/data', (req, res) => {
  res.json(data);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/update', (req, res) => {
  res.json({
    message: "This is a test route for updating data",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
