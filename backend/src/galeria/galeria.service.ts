import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GaleriaItem } from './entities/galeria-item.entity';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectModel(GaleriaItem.name) private readonly galeriaModel: Model<GaleriaItem>,
  ) {}

  async findAll(): Promise<GaleriaItem[]> {
    return this.galeriaModel.find().sort({ createdAt: -1 }).exec();
  }

  async create(data: Partial<GaleriaItem>): Promise<GaleriaItem> {
    const created = new this.galeriaModel(data);
    return created.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.galeriaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Galería no encontrada');
    }
  }
}
