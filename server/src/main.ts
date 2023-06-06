import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService>(ConfigService);

  const HOST = configService.get('NEST_HOST');
  const PORT = configService.get('NEST_PORT');
  const GLOBAL_PREFIX = configService.get('GLOBAL_PREFIX');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const ENABLE_SWAGGER = configService.get<boolean>('ENABLE_SWAGGER');
  if (ENABLE_SWAGGER) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(configService.get('npm_package_name'))
      .setVersion(configService.get('npm_package_version'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const SWAGGER_DOCS_PATH = configService.get('SWAGGER_DOCS_PATH');
    SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);
  }

  app.useGlobalPipes(validationPipe);

  await app.listen(PORT, HOST, () => {
    console.log(`Server listens on http://${HOST}:${PORT}`);
  });
}

bootstrap();
