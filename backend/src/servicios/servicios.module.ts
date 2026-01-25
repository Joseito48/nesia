import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Importar
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicio, ServicioSchema } from './entities/servicio.entity'; // <--- Importar tu entidad

@Module({
  imports: [
    // Aquí registramos el esquema para que este módulo pueda guardar datos
    MongooseModule.forFeature([{ name: Servicio.name, schema: ServicioSchema }]),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}