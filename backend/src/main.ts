import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // --- CONFIGURACIÓN SWAGGER ---
  const options = new DocumentBuilder()
    .setTitle('Nesia AutoDetail API') // Título personalizado
    .setDescription('Documentación de los endpoints de la aplicación')
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación Bearer (JWT)
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  // He cambiado 'api' por 'docs' para evitar conflictos. La URL será: http://localhost:3000/docs
  SwaggerModule.setup('docs', app, document);

  // --- SEGURIDAD Y VALIDACIÓN ---
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Borra datos extra que envíe el usuario y no estén en el DTO
    forbidNonWhitelisted: true, // Da error si envían datos basura
  }));
  
  app.enableCors({
    origin: '*', // Permite peticiones desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // --- ARRANQUE DEL SERVIDOR ---
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Swagger UI funcionando en: http://localhost:${port}/docs`);
}
bootstrap();