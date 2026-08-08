import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservasService.remove(id);
  }
}