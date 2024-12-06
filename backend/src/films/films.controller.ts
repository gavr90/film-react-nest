import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  find() {
    return this.filmsService.find();
  }

  @Get(':id/schedule')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }
}
