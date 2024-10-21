import { AxiosInstance } from 'axios';
import { ICharacter } from '../../interfaces/IExternalApiResponse';
import { externalApi } from './config';
import logger from '../../common/logger';

export class ExternalAPIService {
  private readonly extApi: AxiosInstance;
  private readonly logger: typeof logger;
  public readonly charactersCount: number;

  constructor() {
    this.extApi = externalApi;
    this.logger = logger;
    this.charactersCount = 826;
  }

  public async getCharacterById(id: number): Promise<ICharacter> {
    try {
      const { data } = await this.extApi.get<ICharacter>(`character/${id}`);
      return data;
    } catch (error) {
      this.logger.error('ExternalAPIService: getCharacterById error', error);
      throw error;
    }
  }

  public async getRandomCharacter(): Promise<ICharacter> {
    try {
      const id = Math.floor(Math.random() * this.charactersCount + 1);
      return this.getCharacterById(id);
    } catch (error) {
      this.logger.error('ExternalAPIService: getRandomCharacter error', error);
      throw error;
    }
  }
}
