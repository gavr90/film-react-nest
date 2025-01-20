import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
  ) {}

  private async getSelectedFilm(id: string) {
    const selectedFilm = await this.filmsRepository.findOne({
      where: { id: id },
      relations: { schedule: true },
    });
    return selectedFilm;
  }

  async create(orderDto: CreateOrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      this.getSelectedFilm(film).then((selectedFilm) => {
        if (!selectedFilm) {
          throw new NotFoundException('Фильм не найден');
        }

        const selectedSession = selectedFilm.schedule.find(
          (s) => s.id === session,
        );

        if (!selectedSession) {
          throw new NotFoundException('Сеанс не найден');
        }

        if (row > selectedSession.rows || seat > selectedSession.seats) {
          throw new BadRequestException('Такого места не существует');
        }

        const selectedSeat = `${row}:${seat}`;

        const isTaken = selectedSession.taken?.split(',');

        if (isTaken.includes(selectedSeat)) {
          throw new BadRequestException('Место недоступно для бронирования');
        } else {
          selectedSession.taken = selectedSession.taken
            ? `${selectedSession.taken},${selectedSeat}`
            : selectedSeat;
          this.filmsRepository.save(selectedFilm);
        }
      });
    }
    return { total: tickets.length, items: tickets };
  }
}
