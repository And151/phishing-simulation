import {NestFactory} from '@nestjs/core';
import {PhishingManagementModule} from './phishing-management.module';

async function bootstrap() {
  const app = await NestFactory.create(PhishingManagementModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
