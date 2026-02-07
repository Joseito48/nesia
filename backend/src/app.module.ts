import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiciosModule } from './servicios/servicios.module';
import { ReservasModule } from './reservas/reservas.module';
// Módulo principal de la aplicación, aquí se configuran los módulos importados y la conexión a la base de datos
@Module({
  imports: [
    // Conexión a la BD local llamada 'nesia-db'.
    
    MongooseModule.forRoot('mongodb+srv://admin:admin123@nesia.gbqmzr5.mongodb.net/nesia?appName=Nesia'), 
    ServiciosModule,
    ReservasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}