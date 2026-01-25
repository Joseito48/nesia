import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(@InjectModel(Servicio.name) private servicioModel: Model<Servicio>) {}

  // Método para obtener todos los servicios
  async findAll(): Promise<Servicio[]> {
    return this.servicioModel.find().exec();
  }

  // ¡TRUCO! Método para llenar la BD automáticamente
  async seed() {
    // Borramos lo que haya para no duplicar
    await this.servicioModel.deleteMany({});
    
    const datosIniciales = [
      {
        title: 'Detallado Exterior',
        description: 'Lavado a mano, descontaminación, encerado y limpieza de llantas.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Corrección de Pintura',
        description: 'Eliminación de remolinos y arañazos mediante pulido en múltiples etapas.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1635783344669-e6530a210515?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Detallado Interior',
        description: 'Limpieza profunda de alfombras, tapicería, cuero y eliminación de olores.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2071&auto=format&fit=crop'
      },
      {
        title: 'Recubrimiento Cerámico',
        description: 'Protección duradera contra rayos UV y suciedad con repelencia al agua.',
        price: 600,
        image: 'https://images.unsplash.com/photo-1632823469850-24987aeb437c?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Paquete Completo',
        description: 'La experiencia definitiva: detallado interior y exterior completo.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop'
      },
      {
        title: 'Detallado de Motor',
        description: 'Limpieza, desengrase y acondicionamiento del compartimento del motor.',
        price: 80,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop'
      }
    ];

    return this.servicioModel.insertMany(datosIniciales);
  }

  // Métodos que generó NestJS (los dejamos por si acaso)
  create(createServicioDto: any) { return 'This action adds a new servicio'; }
  findOne(id: number) { return `This action returns a #${id} servicio`; }
  update(id: number, updateServicioDto: any) { return `This action updates a #${id} servicio`; }
  remove(id: number) { return `This action removes a #${id} servicio`; }
}