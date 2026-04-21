import { Test, TestingModule } from '@nestjs/testing';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';

describe('ReservasController', () => {
  let controller: ReservasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasController],
      providers: [
        // Simulador del Servicio
        { provide: ReservasService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ReservasController>(ReservasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});