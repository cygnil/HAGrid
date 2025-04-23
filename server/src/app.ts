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
    message: "Available routes are /data, /users, and /update (all POST only)",
  });
});

// For /data and /users, there's no real reason to use POST over GET for this application other than consistency. In a real application
// we would have authentication headers, request data wrapped in HTTPS, and more robust server interfaces overall.
app.post('/data', (req, res) => {
  res.json(data);
});

app.post('/users', (req, res) => {
  res.json(users);
});

// Our "database" is a simple in-memory object, which is fine (even preferable!) for a demo, since each restart of the server
// will reset the data to its initial state. In a real application, this would contact a database like MongoDB or Postgres.
app.post('/update', (req, res) => {
  if (!req.body || !req.body.id || !req.body.values) {
    return res.status(400).json({error: "Bad POST structure in update, expect id and values (a map of column and updated values)"});
  }

  const dataRow = data.find((row) => row.id === req.body.id) as {[key: string]: any} | undefined;
  if (!dataRow) {
    return res.status(400).json({error: "Data row " + req.body.id + " not found"});
  }

  req.body.values.forEach((value: {column: string; value: any}) => {
    if (dataRow.hasOwnProperty(value.column)) {
      dataRow[value.column] = value.value;
    } else {
      // One major flaw here is data consistency: if the user sends several column updates at once and, for example, the third one fails,
      // the first two columns will be updated but the third and nothing after will update. This doens't affect this demo because we
      // only update one column at a time, but it's worth calling out as a serious flaw for a larger application. A larger application
      // would also probably be backed by a real database with atomic updates, of course.
      res.status(400).json({ error: "Column '" + value.column + "' not found in data row " + dataRow.id});
    }
  });

  res.json({
    message: "This is a test route for updating data",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
