import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FilmDocument = Film & Document<Types.ObjectId>;

export interface ISchedule {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Schedule[];
}

@Schema()
export class Schedule implements ISchedule {
  @Prop({ require: true, type: String })
  id: string;

  @Prop({ required: true, type: Date })
  daytime: Date;

  @Prop({ required: true, type: Number })
  hall: number;

  @Prop({ required: true, type: Number })
  rows: number;

  @Prop({ required: true, type: Number })
  seats: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema({ collection: 'films' })
export class Film {
  @Prop({ require: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  director: string;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  cover: string;

  @Prop({ type: String })
  about: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
