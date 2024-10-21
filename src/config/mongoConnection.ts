import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../common/logger';

const mongoConnect = async () => {
  try {
    await mongoose.connect(config.mongodb_url);
    logger.info(`mongodb connected to: ${config.mongodb_url}`);
  } catch (error) {
    logger.error(
      `mongodb connection error: ${error.message || JSON.stringify(error)}`,
    );
    process.exit(1);
  }
};

const mongoClose = async () => {
  try {
    await mongoose.connection.close();
    logger.info('mongodb connection closed');
  } catch (error) {
    logger.error(
      `mongodb disconnect error: ${error.message || JSON.stringify(error)}`,
    );
  }
};

export { mongoConnect, mongoClose };
