import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservasService } from './reservas.service';
// Controlador para la entidad Reserva, aquí se definen los endpoints relacionados con las reservas (crear y obtener todas las reservas)
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: any) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }
}