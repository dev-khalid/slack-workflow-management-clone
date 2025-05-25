import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger/swagger.config';
import { extraModels } from './swagger/models';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, {
      extraModels,
    });
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });


  const defaultPort = 3000;
  const port = process.env.PORT || defaultPort;
  await app.listen(port);
}
bootstrap();
