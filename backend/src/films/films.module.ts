import { Module } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
