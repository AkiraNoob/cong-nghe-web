import express, { Express } from 'express';
import apiRoute from '../api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

const expressLoader = (app: Express) => {
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
    }),
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/static', express.static('public'));
  app.use('/api/v1', apiRoute); // Root
  app.post('/test-url', (req, res) => {
    console.log(req.body);
    return res.send(req.body);
  });
};

export default expressLoader;
