import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { refreshTokensServiceErrorMessages } from './refresh-tokens.constants';
import { BaseService } from 'src/common/services';
import * as ms from 'ms';
import { AppConfigService } from 'src/config/app-config.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { MAX_USER_SESSIONS_QUANTITY } from '../auth/auth.constants';

@Injectable()
export class RefreshTokensService extends BaseService<RefreshTokenEntity> {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenEntityRepository: Repository<RefreshTokenEntity>,
    private readonly appConfigService: AppConfigService,
    private readonly usersService: UsersService,
  ) {
    super(refreshTokenEntityRepository, refreshTokensServiceErrorMessages);
  }

  async createRefreshToken(
    condition: FindOptionsWhere<UserEntity>,
    tokenData: Partial<RefreshTokenEntity>,
  ): Promise<RefreshTokenEntity> {
    const user = await this.usersService.findOne(condition);

    const tokenLifetime = this.appConfigService.get('JWT_REFRESH_EXPIRES_IN');
    const tokenDuration = ms(tokenLifetime);
    const currentDateTime = new Date();
    const expiresAt = new Date(currentDateTime.getTime() + tokenDuration);

    const refreshTokenModel: Partial<RefreshTokenEntity> = {
      user,
      ...tokenData,
      expiresAt,
    };

    return this.createOne(refreshTokenModel);
  }

  async deleteExceededRefreshTokens(
    condition: FindOptionsWhere<RefreshTokenEntity>,
  ) {
    const exceededTokens = await this.refreshTokenEntityRepository.find({
      where: condition,
      order: {
        createdAt: 'DESC',
      },
      skip: MAX_USER_SESSIONS_QUANTITY,
    });

    const tokenIdsToDelete = exceededTokens.map((token) => token.id);
    if (tokenIdsToDelete.length) {
      await this.refreshTokenEntityRepository.delete(tokenIdsToDelete);
    }
  }
}
