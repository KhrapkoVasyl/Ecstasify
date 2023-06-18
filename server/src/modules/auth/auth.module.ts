import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { RefreshTokensModule } from '../refresh-tokens';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    RefreshTokensModule,
    JwtModule.register({}),
    AppConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
