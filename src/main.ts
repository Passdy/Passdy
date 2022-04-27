import * as dotenv from 'dotenv';
dotenv.config();

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ResponseTransformInterceptor } from 'src/shares/interceptors/response.interceptor';
import { SentryInterceptor } from 'src/shares/interceptors/sentry.interceptor';
import { getConfig } from 'src/configs';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Passdy api')
    .setDescription('The Passdy API description')
    .setVersion('1.0')
    .addTag('passdy')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(getConfig().get<string>('app.port'));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
}
bootstrap();
