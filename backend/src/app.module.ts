import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- Importamos el módulo de configuración
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiciosModule } from './servicios/servicios.module';
import { ReservasModule } from './reservas/reservas.module';
import { AuthModule } from './auth/auth.module';
import { GaleriaModule } from './galeria/galeria.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    // 1. Iniciamos el ConfigModule para que lea el archivo .env
    // El isGlobal: true permite que uses process.env en cualquier parte de la app sin volver a importarlo.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Conectamos a MongoDB usando la variable de entorno de forma asíncrona
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    
    ServiciosModule,
    ReservasModule,
    AuthModule,
    GaleriaModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}