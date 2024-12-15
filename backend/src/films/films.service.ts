import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  async find(): Promise<{ total: number; items: Film[] }> {
    const [total, items] = await Promise.all([
      this.filmsRepository.count(),
      this.filmsRepository.find({ relations: { schedule: true } }),
    ]);

    return { total, items };
  }

  async findOne(id: string): Promise<{ total: number; items: Schedule[] }> {
    try {
      const film = await this.filmsRepository.findOne({
        where: { id: id },
        relations: { schedule: true },
      });
      return {
        total: film.schedule.length,
        items: film.schedule,
      };
    } catch (error) {
      throw new NotFoundException('Фильм не найден');
    }
  }
}
