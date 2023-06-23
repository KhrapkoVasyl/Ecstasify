import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { NodeModeEnum } from 'src/common/enums';

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

  public isMode(mode: NodeModeEnum): boolean {
    return this.get('NODE_ENV') === mode;
  }

  getPostgresConfig(): TypeOrmModuleOptions {
    return {
      type: this.get<'postgres'>('TYPEORM_TYPE'),
      name: this.get('TYPEORM_CONNECTION_NAME'),
      host: this.get('TYPEORM_HOST'),
      port: this.get('TYPEORM_PORT'),
      cache: this.get('TYPEORM_CACHE'),
      logging: this.get('TYPEORM_LOGGING'),
      database: this.get<string>('TYPEORM_DATABASE'),
      username: this.get('TYPEORM_USERNAME'),
      password: this.get<string>('TYPEORM_PASSWORD'),
      extra: {
        ssl: this.get('TYPEORM_SSL'),
      },
      dropSchema: this.get('TYPEORM_DROP_SCHEMA'),
      synchronize: this.get('TYPEORM_SYNCHRONIZE'),
      migrationsRun: this.get('TYPEORM_MIGRATIONS_RUN'),
      entities: [join(__dirname, '../modules/**/*.entity.{ts,js}')],
      migrations: [join(__dirname, '../systems/database/migrations/*.{ts,js}')],
    };
  }
}
