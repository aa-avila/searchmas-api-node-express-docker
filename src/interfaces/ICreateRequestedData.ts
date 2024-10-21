export interface ICreateRequestedData {
  requester: string;
  requestReason?: string;
  externalId: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  episodes: string[];
  url: string;
}
