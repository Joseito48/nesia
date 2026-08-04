import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva, ReservaSchema } from './entities/reserva.entity';
import { MailService } from '../common/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }])
  ],
  controllers: [ReservasController],
  providers: [ReservasService, MailService],
})
export class ReservasModule {}