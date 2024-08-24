import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'web-analytics' })
export class WebAnalytics extends Document {
  @Prop({ required: true })
  pageURL: string;

  @Prop({ required: true })
  visitDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const WebAnalyticsSchema = SchemaFactory.createForClass(WebAnalytics);
