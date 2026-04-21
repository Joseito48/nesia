import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

describe('ServiciosController', () => {
  let controller: ServiciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosController],
      providers: [
        // Simuladores
        { provide: ServiciosService, useValue: {} },
        { provide: CloudinaryService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ServiciosController>(ServiciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});