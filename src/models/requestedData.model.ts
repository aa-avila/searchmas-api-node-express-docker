import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@modelOptions({
  schemaOptions: {
    collection: 'requestedData',
    timestamps: true,
    toObject: {
      getters: true,
      virtuals: false,
      transform: function (_doc, ret) {
        delete ret.__v;
      },
    },
  },
})
export class RequestedData {
  _id: ObjectId;

  @prop({ type: String, required: true })
  requester!: string;

  @prop({
    type: String,
  })
  requestReason: string;

  @prop({ type: Number, required: true })
  externalId!: number;

  @prop({
    type: String,
  })
  name: string;

  @prop({
    type: String,
  })
  species: string;

  @prop({
    type: String,
  })
  gender: string;

  @prop({
    type: String,
  })
  image: string;

  @prop({
    type: [String],
    default: [],
  })
  episodes: string[];

  @prop({
    type: String,
  })
  url: string;
}

export const RequestedDataModel = getModelForClass(RequestedData);
