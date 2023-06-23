import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { genresServiceErrorMessages } from './genres.constants';
import { GenreEntity } from './genre.entity';

@Injectable()
export class GenresService extends BaseService<GenreEntity> {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreEntityRepository: Repository<GenreEntity>,
  ) {
    super(genreEntityRepository, genresServiceErrorMessages);
  }
}
