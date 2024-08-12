import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction{
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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
