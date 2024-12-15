import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Film } from 'src/films/entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/films/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
