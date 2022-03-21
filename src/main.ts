import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ResponseTransformInterceptor } from 'src/shares/interceptors/response.interceptor';
import { SentryInterceptor } from 'src/shares/interceptors/sentry.interceptor';
import { getConfig } from 'src/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log(getConfig().get<string>('app.port'));
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
