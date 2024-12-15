//TODO описать DTO для запросов к /films
import {
  IsNumber,
  IsString,
  IsArray,
  IsDate,
  IsPositive,
} from 'class-validator';

export class ScheduleDto {
  @IsDate()
  daytime: Date;
  @IsNumber()
  hall: number;
  @IsNumber()
  @IsPositive()
  rows: number;
  @IsNumber()
  @IsPositive()
  seats: number;
  @IsNumber()
  @IsPositive()
  price: number;
}

export class FilmDto {
  @IsString()
  title: string;
  @IsString()
  director: string;
  @IsNumber()
  rating: number;
  @IsArray()
  tags: string[];
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsArray()
  schedule: ScheduleDto[];
}
