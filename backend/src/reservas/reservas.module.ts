import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva, ReservaSchema } from './entities/reserva.entity';
// Módulo de reservas, aquí se configura el esquema de Mongoose para el modelo Reserva, se importan el controlador y el servicio relacionados con las reservas
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }])
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}