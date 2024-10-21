import { ReturnModelType } from '@typegoose/typegoose';
import {
  RequestedDataModel,
  RequestedData,
} from '../models/requestedData.model';
import { ICreateDocResponse } from '../interfaces/ICreateDocResponse';
import { ICreateRequestedData } from '../interfaces/ICreateRequestedData';

export class RequestedDataRepository {
  private readonly model: ReturnModelType<typeof RequestedDataModel>;
  constructor() {
    this.model = RequestedDataModel;
  }

  public async create(data: ICreateRequestedData): Promise<ICreateDocResponse> {
    const createdDoc = await this.model.create(data);

    return {
      _id: createdDoc._id.toString(),
    };
  }

  public async getAll(): Promise<RequestedData[]> {
    const docs = await this.model.find();
    return docs.map((doc) => doc.toObject());
  }
}
