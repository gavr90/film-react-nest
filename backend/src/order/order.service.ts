import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  private async getSelectedFilm(id: string) {
    const selectedFilm = this.filmsRepository.findOne({ id });
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

        if (selectedSession.taken.includes(selectedSeat)) {
          throw new BadRequestException('Место недоступно для бронирования');
        } else {
          selectedSession.taken.push(selectedSeat);
          selectedFilm.save();
        }
      });
    }
    return { total: tickets.length, items: tickets };
  }
}
