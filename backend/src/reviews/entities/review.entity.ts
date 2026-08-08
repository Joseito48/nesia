import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
