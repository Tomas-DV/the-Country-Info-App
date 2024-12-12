import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your Next.js app URL
    methods: 'GET,POST,PUT,DELETE', // Specify the allowed methods
    allowedHeaders: 'Content-Type, Accept', // Specify the allowed headers
  });

  await app.listen(3002);
}
bootstrap();
