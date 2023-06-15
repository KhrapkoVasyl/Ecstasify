import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from '../refresh-token/refresh-tokens.service';
import * as bcrypt from 'bcrypt';
import { authServiceErrorMessages } from './auth.constants';
import { AuthTokens, JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private refreshTokensService: RefreshTokensService,
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService
      .findOne({ email: createUserDto.email })
      .then(() => true)
      .catch(() => false);

    if (userExists) {
      throw new BadRequestException(
        authServiceErrorMessages.entityAlreadyExists,
      );
    }

    const user = await this.usersService.createOne(createUserDto);
    const payload = { id: user.id, email: user.email };
    const tokens = await this.generateTokens(payload);
    await this.refreshTokensService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return { ...tokens };
  }

  async signIn(data: AuthDto) {
    let user;
    try {
      user = await this.usersService.findOne({ email: data.email });
    } catch {
      throw new BadRequestException(authServiceErrorMessages.invalidData);
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException(authServiceErrorMessages.invalidData);

    const payload = { id: user.id, email: user.email };
    const tokens = await this.generateTokens(payload);
    await this.refreshTokensService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return { ...tokens };
  }

  async generateTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.appConfigService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.appConfigService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.appConfigService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.appConfigService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    const tokens: AuthTokens = {
      accessToken,
      refreshToken,
    };

    return tokens;
  }
}
