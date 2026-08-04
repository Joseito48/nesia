import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GaleriaController } from './galeria.controller';
import { GaleriaService } from './galeria.service';
import { GaleriaItem, GaleriaItemSchema } from './entities/galeria-item.entity';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { AuthGuard } from '../servicios/auth.guard';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: GaleriaItem.name, schema: GaleriaItemSchema }]),
  ],
  controllers: [GaleriaController],
  providers: [GaleriaService, CloudinaryService, AuthGuard],
})
export class GaleriaModule {}
