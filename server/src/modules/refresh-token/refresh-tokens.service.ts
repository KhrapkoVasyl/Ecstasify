import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { refreshTokensServiceErrorMessages } from './refresh-tokens.constants';
import { BaseService } from 'src/common/services';
import { AppConfigService } from 'src/config/app-config.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RefreshTokensService extends BaseService<RefreshTokenEntity> {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenEntityRepository: Repository<RefreshTokenEntity>,
    private appConfigService: AppConfigService,
    private usersService: UsersService,
  ) {
    super(refreshTokenEntityRepository, refreshTokensServiceErrorMessages);
  }
}
