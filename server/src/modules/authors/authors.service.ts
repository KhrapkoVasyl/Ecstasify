import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { authorsServiceErrorMessages } from './authors.constants';
import { AuthorEntity } from './author.entity';

@Injectable()
export class AuthorsService extends BaseService<AuthorEntity> {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorEntityRepository: Repository<AuthorEntity>,
  ) {
    super(authorEntityRepository, authorsServiceErrorMessages);
  }
}
