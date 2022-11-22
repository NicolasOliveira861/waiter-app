import express, { json } from 'express';
import mongoose from 'mongoose';
import { router } from './routes';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  })
  .catch(() => console.log('Cannot connect to mongo!'));
