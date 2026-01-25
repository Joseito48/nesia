import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservasService } from './reservas.service';
// Si tienes un DTO definido úsalo, si no, usaremos 'any' por ahora para simplificar
// import { CreateReservaDto } from './dto/create-reserva.dto';

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