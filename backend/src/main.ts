import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Borra datos extra que envíe el usuario y no estén en el DTO
    forbidNonWhitelisted: true, // Da error si envían datos basura
  }));
  
  app.enableCors({
    origin: '*', // Permite peticiones desde cualquier origen (local o Vercel)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();