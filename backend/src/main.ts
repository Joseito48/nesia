import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ACTIVAR CORS: Esto permite que Angular pida datos
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();