import { Module } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokensService } from './refresh-tokens.service';
import { AppConfigModule } from 'src/config';
import { UsersModule } from '../users';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    AppConfigModule,
  ],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
