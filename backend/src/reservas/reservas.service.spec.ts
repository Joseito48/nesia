import { Test, TestingModule } from '@nestjs/testing';
import { ReservasService } from './reservas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reserva } from './entities/reserva.entity';

describe('ReservasService', () => {
  let service: ReservasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        // Simulador de la base de datos de Reservas
        { provide: getModelToken(Reserva.name), useValue: {} },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});