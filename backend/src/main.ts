import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
// Configuración de CORS para permitir peticiones desde cualquier origen, esto es especialmente útil durante el desarrollo local y también para permitir que la aplicación frontend desplegada en Vercel pueda comunicarse con el backend sin problemas de CORS
  app.enableCors({
    origin: '*', // Permite peticiones desde cualquier origen (local o Vercel)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();