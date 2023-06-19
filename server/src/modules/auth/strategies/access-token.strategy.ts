import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { AccessJwtPayload } from '../types';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ id, role, name }: AccessJwtPayload) {
    const userData = await this.usersService.findOne(
      { id, role, name },
      {
        select: { id: true, role: true, name: true },
        loadEagerRelations: false,
      },
    );

    return userData;
  }
}
