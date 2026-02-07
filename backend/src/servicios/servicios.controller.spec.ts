import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
//  Prueba unitaria para el controlador de servicios, verifica que el controlador se defina correctamente
describe('ServiciosController', () => {
  let controller: ServiciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosController],
      providers: [ServiciosService],
    }).compile();

    controller = module.get<ServiciosController>(ServiciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
