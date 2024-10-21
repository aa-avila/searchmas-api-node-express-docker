import { RequestedDataRepository } from '../../repositories/requestedData.repository';
import { ICreateDocResponse } from '../../interfaces/ICreateDocResponse';
import { ExternalAPIService } from '../externalAPI/externalAPI.service';
import { ICreateRequestedData } from '../../interfaces/ICreateRequestedData';
import { RequestedData } from '../../models/requestedData.model';
import { json2csv } from 'json-2-csv';
import logger from '../../common/logger';

import Boom from '@hapi/boom';

export class DataService {
  private readonly requestedDataRepository: RequestedDataRepository;
  private readonly externalAPIService: ExternalAPIService;
  private readonly logger: typeof logger;

  constructor() {
    this.requestedDataRepository = new RequestedDataRepository();
    this.externalAPIService = new ExternalAPIService();
    this.logger = logger;
  }

  public async requestExternalData(
    requester: string,
    requestReason?: string,
  ): Promise<ICreateDocResponse> {
    try {
      const externalData = await this.externalAPIService.getRandomCharacter();
      const data: ICreateRequestedData = {
        requester,
        requestReason,
        externalId: externalData.id,
        name: externalData.name,
        species: externalData.species,
        gender: externalData.gender,
        image: externalData.image,
        episodes: externalData.episode,
        url: externalData.url,
      };
      return this.requestedDataRepository.create(data);
    } catch (error) {
      this.logger.error('ExternalAPIService: requestExternalData error', error);
      throw Boom.serverUnavailable(
        'An error ocurred requesting external API data',
      );
    }
  }

  public async getAll(): Promise<RequestedData[]> {
    return this.requestedDataRepository.getAll();
  }

  public async getAllWithStats(): Promise<{
    docs: RequestedData[];
    stats: {
      totalDocs: number;
      requesters: number;
      characters: number;
      maleGender: number;
      femaleGender: number;
      genderless: number;
      unknownGender: number;
      species: number;
      episodes: number;
    };
  }> {
    const docs = await this.getAll();
    const totalDocs = docs.length;

    const docsWithoutDuplicates = docs.filter(
      (doc, index, self) =>
        self.findIndex((t) => t.externalId === doc.externalId) === index,
    );
    const characters = docsWithoutDuplicates.length;

    // get total gender count by type
    const maleGender = docsWithoutDuplicates.filter(
      (doc) => doc.gender === 'Male',
    ).length;
    const femaleGender = docsWithoutDuplicates.filter(
      (doc) => doc.gender === 'Female',
    ).length;
    const genderless = docsWithoutDuplicates.filter(
      (doc) => doc.gender === 'Genderless',
    ).length;
    const unknownGender = docsWithoutDuplicates.filter(
      (doc) => doc.gender === 'unknown',
    ).length;

    // get species count without duplicates
    const species = docsWithoutDuplicates
      .map((doc) => doc.species)
      .filter((value, index, self) => self.indexOf(value) === index).length;

    // get episodes count without duplicates
    const episodes = docsWithoutDuplicates
      .flatMap((doc) => doc.episodes)
      .filter((value, index, self) => self.indexOf(value) === index).length;

    // get requesters count without duplicates
    const requesters = docsWithoutDuplicates
      .map((doc) => doc.requester)
      .filter((value, index, self) => self.indexOf(value) === index).length;

    return {
      docs,
      stats: {
        totalDocs,
        requesters,
        characters,
        maleGender,
        femaleGender,
        genderless,
        unknownGender,
        species,
        episodes,
      },
    };
  }
  public async exportCsv(): Promise<{
    csv: string;
    filename: string;
  }> {
    const docs = await this.getAll();
    const data = docs.map((doc) => {
      return {
        requester: doc.requester,
        externalId: doc.externalId,
        name: doc.name,
        species: doc.species,
        gender: doc.gender,
        image: doc.image,
        episodes: doc.episodes,
        url: doc.url,
      };
    });
    const csv = json2csv(data, {
      delimiter: {
        field: ';',
      },
    });
    const now = new Date();
    const filename = `data_${now.getFullYear()}-${now.getMonth()}-${now.getDay()}-${now.getHours()}-${now.getMinutes()}.csv`;

    return {
      csv,
      filename,
    };
  }
}
