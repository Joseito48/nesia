import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosService } from './servicios.service';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  // Endpoint especial para llenar la BD: GET /servicios/seed
  @Get('seed')
  seedData() {
    return this.serviciosService.seed();
  }

  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  // ... (El resto de métodos se quedan igual)
  @Post()
  create(@Body() createServicioDto: any) { return this.serviciosService.create(createServicioDto); }
  @Get(':id')
  findOne(@Param('id') id: string) { return this.serviciosService.findOne(+id); }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioDto: any) { return this.serviciosService.update(+id, updateServicioDto); }
  @Delete(':id')
  remove(@Param('id') id: string) { return this.serviciosService.remove(+id); }
}