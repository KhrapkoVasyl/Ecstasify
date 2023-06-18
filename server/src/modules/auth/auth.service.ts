import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import * as bcrypt from 'bcrypt';
import { authServiceErrorMessages } from './auth.constants';
import { AuthTokens, AccessJwtPayload, RefreshJwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { UserEntity } from '../users/user.entity';
import { FindOptionsWhere } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SingInDto } from './dto';

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

    const refreshTokenId = uuidv4();
    const tokens = await this.generateTokens(user, refreshTokenId);
    await this.refreshTokensService.createRefreshToken(
      { id: user.id },
      { value: tokens.refreshToken, id: refreshTokenId },
    );

    return { ...tokens };
  }

  async signIn(data: SingInDto): Promise<AuthTokens> {
    const user = await this.usersService
      .findOne({ email: data.email })
      .catch(() => {
        throw new BadRequestException(authServiceErrorMessages.invalidData);
      });

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException(authServiceErrorMessages.invalidData);

    const refreshTokenId = uuidv4();
    const tokens = await this.generateTokens(user, refreshTokenId);
    await this.refreshTokensService.createRefreshToken(
      { id: user.id },
      { value: tokens.refreshToken, id: refreshTokenId },
    );

    await this.refreshTokensService.deleteExpiredRefreshTokens({
      user: { id: user.id },
    });

    return { ...tokens };
  }

  async signOut(refreshTokenId: string) {
    return await this.refreshTokensService.deleteOne({ id: refreshTokenId });
  }

  async refreshTokens(
    condition: FindOptionsWhere<UserEntity>,
    refreshTokenId: string,
  ): Promise<AuthTokens> {
    let user;
    try {
      user = await this.usersService.findOne(condition);
      await this.refreshTokensService.findOne({
        id: refreshTokenId,
        user: condition,
      });
    } catch {
      throw new UnauthorizedException(authServiceErrorMessages.unauthorized);
    }

    await this.refreshTokensService.deleteOne({ id: refreshTokenId });

    const newRefreshTokenId = uuidv4();
    const tokens = await this.generateTokens(user, newRefreshTokenId);
    await this.refreshTokensService.createRefreshToken(
      { id: user.id },
      { value: tokens.refreshToken, id: newRefreshTokenId },
    );

    return { ...tokens };
  }

  async generateTokens(
    user: UserEntity,
    refreshTokenId: string,
  ): Promise<AuthTokens> {
    const accessTokenPayload: AccessJwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const refreshTokenPayload: RefreshJwtPayload = {
      ...accessTokenPayload,
      refreshTokenId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, {
        secret: this.appConfigService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.appConfigService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
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
