import express, { Express } from 'express';
import { Server, IncomingMessage, ServerResponse } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import compressFilter from './common/compressFilter';
import config from './config/config';
import { mongoConnect, mongoClose } from './config/mongoConnection';
import logger from './common/logger';
import healthRouter from './routes/health.router';
import dataRouter from './routes/data.router';
import notFoundHandler from './middlewares/notFoundHandler';
import { logErrors } from './middlewares/logErrors';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

app.use(
  cors({
    origin: [config.cors_origin],
    credentials: true,
  }),
);
app.use(helmet()); // secure this app by configuring the http-header
app.use(compression({ filter: compressFilter }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/health', healthRouter);
app.use('/api', dataRouter);

// Not Found Handler
app.use(notFoundHandler);
// Error logger
app.use(logErrors);
// Error handler
app.use(errorHandler);

// *************************************
// start server
let server: Server<typeof IncomingMessage, typeof ServerResponse>;
const start = async () => {
  await mongoConnect();
  server = app.listen(parseInt(config.port), () => {
    logger.log('info', `Server is running on Port: ${config.port}`);
  });
};
start();

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close(async (err) => {
    await mongoClose();
    logger.info('Http server closed.');
    err && logger.error(err);
    process.exit(err ? 1 : 0);
  });
});

export default app;
