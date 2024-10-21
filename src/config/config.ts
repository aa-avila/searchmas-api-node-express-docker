import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  mongodb_url: process.env.MONGODB_URL,
  external_api_url: process.env.EXTERNAL_API_URL,
};

export default config;
