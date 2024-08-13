import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true, versionKey: false } })
export class Transaction {
  @Prop()
  id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['debit', 'credit'] })
  type: string;

  @Prop({ required: true, enum: ['pending', 'completed', 'failed'] })
  status: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// Transform the _id field to id
TransactionSchema.set('toJSON', {
  transform: (ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
