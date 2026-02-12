import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(@InjectModel(Servicio.name) private servicioModel: Model<Servicio>) {}

  // 1. Obtener todos
  async findAll(): Promise<Servicio[]> {
    return this.servicioModel.find().exec();
  }

  // 2. CREAR NUEVO SERVICIO 
  async create(createServicioDto: any): Promise<Servicio> {
    const nuevoServicio = new this.servicioModel(createServicioDto);
    return nuevoServicio.save();
  }

  // 3. Seed 
  async seed() {
    await this.servicioModel.deleteMany({});
    const datosIniciales = [
      {
        title: 'Detallado Exterior',
        description: 'Lavado a mano, descontaminación, encerado.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Corrección de Pintura',
        description: 'Eliminación de remolinos y arañazos.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1635783344669-e6530a210515?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Detallado Interior',
        description: 'Limpieza profunda de alfombras y cuero.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2071&auto=format&fit=crop'
      }
    ];
    return this.servicioModel.insertMany(datosIniciales);
  }

  // Métodos extra (opcionales)
  findOne(id: number) { return `This action returns a #${id} servicio`; }
  update(id: number, updateServicioDto: any) { return `This action updates a #${id} servicio`; }
  remove(id: number) { return `This action removes a #${id} servicio`; }
}