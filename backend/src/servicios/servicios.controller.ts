import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiciosService } from './servicios.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Controller('servicios')
export class ServiciosController {
  constructor(
    private readonly serviciosService: ServiciosService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // 1. OBTENER TODOS LOS SERVICIOS (GET /servicios)
  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  // 2. SUBIR IMAGEN (POST /servicios/upload)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  }

  // 3. CREAR EL SERVICIO EN MONGODB (POST /servicios) 
  @Post()
  create(@Body() body: any) {
    // 'body' contiene: { title: '...', price: 10, image: 'http...' }
    return this.serviciosService.create(body);
  }

  // 4. (Opcional) SEED - Llenar base de datos
  @Get('seed')
  runSeed() {
    return this.serviciosService.seed();
  }
}