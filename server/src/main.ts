import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multipart from '@fastify/multipart';

import { validationPipe } from './common/pipes';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const appConfigService = app.get<AppConfigService>(AppConfigService);

  await app.register(multipart, {
    limits: {
      fileSize: appConfigService.get<number>('MULTIPART_FILE_SIZE_LIMIT'),
    },
    addToBody: true,
  });
  const HOST = appConfigService.get<string>('NEST_HOST');
  const PORT = appConfigService.get<string>('NEST_PORT');
  const GLOBAL_PREFIX = appConfigService.get<string>('GLOBAL_PREFIX');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const ENABLE_SWAGGER = appConfigService.get<boolean>('ENABLE_SWAGGER');
  if (ENABLE_SWAGGER) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(appConfigService.get('npm_package_name'))
      .setVersion(appConfigService.get('npm_package_version'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const SWAGGER_DOCS_PATH = appConfigService.get<string>('SWAGGER_DOCS_PATH');
    SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);
  }

  app.useGlobalPipes(validationPipe);

  await app.listen(PORT, HOST, () => {
    console.log(`Server listens on port ${PORT}`);
  });
}

bootstrap();
