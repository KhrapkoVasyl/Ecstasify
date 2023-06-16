import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import * as bcrypt from 'bcrypt';
import { authServiceErrorMessages } from './auth.constants';
import { AuthTokens, JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { UserEntity } from '../users/user.entity';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthTokens> {
    const userExists = await this.usersService
      .findOne({ email: createUserDto.email })
      .catch(() => null);

    if (userExists) {
      throw new ConflictException(authServiceErrorMessages.entityAlreadyExists);
    }

    const user = await this.usersService.createOne(createUserDto);

    const tokens = await this.generateTokens(user);
    await this.refreshTokensService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return { ...tokens };
  }

  async signIn(data: AuthDto): Promise<AuthTokens> {
    const user = await this.usersService
      .findOne({ email: data.email })
      .catch(() => {
        throw new BadRequestException(authServiceErrorMessages.invalidData);
      });

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException(authServiceErrorMessages.invalidData);

    const tokens = await this.generateTokens(user);
    await this.refreshTokensService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return { ...tokens };
  }

  async signOut(userId: string) {
    return this.refreshTokensService.deleteOne({ user: { id: userId } });
  }

  async refreshTokens(
    condition: FindOptionsWhere<UserEntity>,
    refreshToken: string,
  ): Promise<AuthTokens> {
    let user, token;
    try {
      user = await this.usersService.findOne(condition);
      token = await this.refreshTokensService.findOne({
        user: { id: user.id },
      });
    } catch {
      throw new UnauthorizedException(authServiceErrorMessages.unauthorized);
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, token.value);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException(authServiceErrorMessages.unauthorized);
    }

    const tokens = await this.generateTokens(user);
    await this.refreshTokensService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return { ...tokens };
  }

  async generateTokens(user: UserEntity): Promise<AuthTokens> {
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

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
