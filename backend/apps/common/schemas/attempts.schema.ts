import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AttemptsDocument = Attempts & Document;

export enum AttemptStatus {
  SENT = 'SENT',
  OPENED = 'OPENED',
}

@Schema({
  timestamps: true,
})
export class Attempts extends Document {
  @Prop({
    index: true,
    sparse: true,
  })
  email: string;

  @Prop()
  content: string;

  @Prop({
    type: String,
    enum: AttemptStatus,
  })
  status: AttemptStatus;
}

export const AttemptsSchema = SchemaFactory.createForClass(Attempts);
