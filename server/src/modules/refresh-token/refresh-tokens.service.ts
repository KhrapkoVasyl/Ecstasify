import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { refreshTokensServiceErrorMessages } from './refresh-tokens.constants';
import { BaseService } from 'src/common/services';
import * as ms from 'ms';
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

  async updateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne({ id: userId });

    const tokenLifetime = this.appConfigService.get('JWT_REFRESH_EXPIRES_IN');
    const tokenDuration = ms(tokenLifetime);
    const currentDateTime = new Date();
    const expiresAt = new Date(currentDateTime.getTime() + tokenDuration);

    const refreshTokenModel: Partial<RefreshTokenEntity> = {
      user,
      value: refreshToken,
      expiresAt,
    };

    const existingRefreshToken = await this.findOne({
      user: { id: userId },
    }).catch(() => null);

    if (!existingRefreshToken) {
      return this.createOne(refreshTokenModel);
    }

    return this.updateOne({ id: existingRefreshToken.id }, refreshTokenModel);
  }
}
