import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva } from './entities/reserva.entity';
import { MailService } from '../common/mail/mail.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectModel(Reserva.name) private reservaModel: Model<Reserva>,
    private readonly mailService: MailService,
  ) {}

  async create(createReservaDto: any): Promise<Reserva> {
    const nuevaReserva = new this.reservaModel(createReservaDto);
    const reservaGuardada = await nuevaReserva.save();

    try {
      await this.mailService.sendReservationEmail(reservaGuardada);
    } catch (error) {
      console.error('No se pudo enviar el correo de reserva:', error);
    }

    return reservaGuardada;
  }

  async findAll() {
    return this.reservaModel.find().exec();
  }

  async remove(id: string) {
    return this.reservaModel.findByIdAndDelete(id).exec();
  }
}