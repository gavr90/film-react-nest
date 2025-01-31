import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from './film.entity';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsDate()
  daytime: Date;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsString()
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
