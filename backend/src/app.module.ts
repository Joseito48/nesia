import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Importar esto
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiciosModule } from './servicios/servicios.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    // Conexión a la BD local llamada 'nesia-db'.
    // Si usas Docker o Atlas, cambiarás esta URL más adelante.
    MongooseModule.forRoot('mongodb+srv://admin:admin123@nesia.gbqmzr5.mongodb.net/?appName=Nesia'), 
    ServiciosModule,
    ReservasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}