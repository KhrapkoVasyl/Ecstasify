import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get<T>(key: string): T {
    const value = this.configService.get<T>(key);

    if (!value) {
      throw new Error(key + ' environment variable is not set');
    }

    try {
      return JSON.parse(value as string);
    } catch {
      return value;
    }
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('TYPEORM_HOST'),
      port: parseInt(this.get('TYPEORM_PORT'), 10) || 5432,
      username: this.get('TYPEORM_USER'),
      password: this.get('TYPEORM_PASSWORD'),
      database: this.get('TYPEORM_DB'),
      synchronize: true,
      ssl: true,
    };
  }
}
