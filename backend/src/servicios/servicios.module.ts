import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio, ServicioSchema } from './entities/servicio.entity';

@Module({
  imports: [
    // Esquema de Mongoose para el modelo Servicio
    MongooseModule.forFeature([{ name: Servicio.name, schema: ServicioSchema }]),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}