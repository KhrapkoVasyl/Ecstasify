import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config';
import { AppConfigService } from '../../config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        ...configService.getPostgresConfig(),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
