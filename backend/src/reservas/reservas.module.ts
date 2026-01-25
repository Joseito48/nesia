import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva, ReservaSchema } from './entities/reserva.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }])
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}