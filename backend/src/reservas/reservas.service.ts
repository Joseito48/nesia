import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {
  constructor(@InjectModel(Reserva.name) private reservaModel: Model<Reserva>) {}

  async create(createReservaDto: any): Promise<Reserva> {
    const nuevaReserva = new this.reservaModel(createReservaDto);
    return nuevaReserva.save();
  }

  async findAll() {
    return this.reservaModel.find().exec();
  }
}