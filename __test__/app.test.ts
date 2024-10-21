import { ICharacter } from '../src/interfaces/IExternalApiResponse';
import app from '../src/server';
import { ExternalAPIService } from '../src/services/externalAPI/externalAPI.service';
import { RequestedDataRepository } from '../src/repositories/requestedData.repository';
import request from 'supertest';
import { RequestedData } from '../src/models/requestedData.model';

jest.mock('../src/services/externalAPI/externalAPI.service');
const ExternalAPIServiceMock = jest.mocked(ExternalAPIService);

jest.mock('../src/repositories/requestedData.repository');
const RequestedDataRepositoryMock = jest.mocked(RequestedDataRepository);

describe('health check', () => {
  it('/health (GET)', async () => {
    const {
      status,
      body: { data },
    } = await request(app).get('/health');

    expect(status).toBe(200);
    expect(data).toBe('OK');
  });
});

describe('api', () => {
  it('/api/external-data (POST)', async () => {
    const mockData = {
      id: 106,
      name: 'Dr. Schmidt',
      status: 'unknown',
      species: 'Human',
      type: 'Game',
      gender: 'Male',
      origin: {
        name: 'Roy: A Life Well Lived',
        url: 'https://rickandmortyapi.com/api/location/32',
      },
      location: {
        name: 'Roy: A Life Well Lived',
        url: 'https://rickandmortyapi.com/api/location/32',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/106.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/13'],
      url: 'https://rickandmortyapi.com/api/character/106',
      created: '2017-12-26T12:46:48.805Z',
    } as unknown as ICharacter;
    ExternalAPIServiceMock.prototype.getRandomCharacter.mockReturnValue(
      Promise.resolve(mockData),
    );

    RequestedDataRepositoryMock.prototype.create.mockReturnValue(
      Promise.resolve({ _id: 'testId' }),
    );

    const reqBody = {
      requester: 'John Doe',
      requestReason: 'Test',
    };

    const {
      status,
      body: { data },
    } = await request(app).post('/api/external-data').send(reqBody);

    expect(
      ExternalAPIServiceMock.prototype.getRandomCharacter,
    ).toHaveBeenCalledTimes(1);
    expect(RequestedDataRepositoryMock.prototype.create).toHaveBeenCalledTimes(
      1,
    );
    expect(status).toBe(201);
    expect(data._id).toBe('testId');
  });

  it('/api/data (GET)', async () => {
    const expectedResponse = {
      data: {
        docs: [
          {
            _id: '67168be38ba437276aeed68b',
            requester: 'Jon Snow',
            requestReason: 'The more you give a king, the more he wants.',
            externalId: 106,
            name: 'Dr. Schmidt',
            species: 'Human',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/106.jpeg',
            episodes: ['https://rickandmortyapi.com/api/episode/13'],
            url: 'https://rickandmortyapi.com/api/character/106',
            createdAt: '2024-10-21T17:14:11.478Z',
            updatedAt: '2024-10-21T17:14:11.478Z',
          },
        ],
        stats: {
          totalDocs: 1,
          requesters: 1,
          characters: 1,
          maleGender: 1,
          femaleGender: 0,
          genderless: 0,
          unknownGender: 0,
          species: 1,
          episodes: 1,
        },
      },
    };
    RequestedDataRepositoryMock.prototype.getAll.mockReturnValue(
      Promise.resolve([
        {
          _id: '67168be38ba437276aeed68b',
          requester: 'Jon Snow',
          requestReason: 'The more you give a king, the more he wants.',
          externalId: 106,
          name: 'Dr. Schmidt',
          species: 'Human',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/106.jpeg',
          episodes: ['https://rickandmortyapi.com/api/episode/13'],
          url: 'https://rickandmortyapi.com/api/character/106',
          createdAt: '2024-10-21T17:14:11.478Z',
          updatedAt: '2024-10-21T17:14:11.478Z',
        },
      ] as unknown as RequestedData[]),
    );

    const {
      status,
      body: { data },
    } = await request(app).get('/api/data');
    console.log(data);
    expect(RequestedDataRepositoryMock.prototype.getAll).toHaveBeenCalledTimes(
      1,
    );
    expect(status).toBe(200);
    expect(data).toEqual(expectedResponse.data);
  });
});
