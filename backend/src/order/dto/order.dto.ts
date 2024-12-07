//TODO реализовать DTO для /orders
import {
  IsArray,
  IsNumber,
  IsString,
  IsEmail,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  @IsPositive()
  row: number;
  @IsNumber()
  @IsPositive()
  seat: number;
  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}
