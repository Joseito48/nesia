import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Delete, Param, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiciosService } from './servicios.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import * as multer from 'multer';
import { AuthGuard } from './auth.guard'; // <--- 1. IMPORTAMOS EL GUARD

@Controller('servicios')
export class ServiciosController {
  constructor(
    private readonly serviciosService: ServiciosService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // 1. OBTENER TODOS LOS SERVICIOS (PÚBLICO)
  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  // 2. SUBIR IMAGEN (PROTEGIDO 🔒)
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  }

  // 3. BORRAR UN SERVICIO (PROTEGIDO 🔒)
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviciosService.delete(id);
  }

  // 4. CREAR EL SERVICIO EN MONGODB (PROTEGIDO 🔒) 
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  // 5. SEED (PÚBLICO)
  @Get('seed')
  runSeed() {
    return this.serviciosService.seed();
  }
}