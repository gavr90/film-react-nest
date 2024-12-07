import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../repository/entity.repository';
import { FilmDocument } from '../films/entities/films.entity';

@Injectable()
export class FilmsRepository extends EntityRepository<FilmDocument> {
  constructor(@InjectModel('Film') filmModel: Model<FilmDocument>) {
    super(filmModel);
  }
}
