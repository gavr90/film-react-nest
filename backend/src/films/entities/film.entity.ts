import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { IsString, IsNumber } from 'class-validator';
import { Document, Types } from 'mongoose';

export type FilmDocument = Film & Document<Types.ObjectId>;

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  director: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
