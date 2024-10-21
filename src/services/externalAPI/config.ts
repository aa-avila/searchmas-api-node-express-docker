import Axios from 'axios';
import config from '../../config/config';

const DEFAULT_TIMEOUT = 15000;

export const externalApi = Axios.create({
  baseURL: config.external_api_url,
  timeout: DEFAULT_TIMEOUT,
});
