import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { AuthGuard } from '../servicios/auth.guard';
import { GaleriaService } from './galeria.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Controller('galeria')
export class GaleriaController {
  constructor(
    private readonly galeriaService: GaleriaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  findAll() {
    return this.galeriaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const title = req.body?.title as string;
    const description = req.body?.description as string;
    const category = req.body?.category as string;

    const uploaded = await this.cloudinaryService.uploadImage(file);

    return this.galeriaService.create({
      title,
      description,
      category,
      image: uploaded.secure_url,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
