import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosService } from './servicios.service';
// Prueba unitaria para el servicio de servicios, verifica que el servicio se defina correctamente
describe('ServiciosService', () => {
  let service: ServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiciosService],
    }).compile();

    service = module.get<ServiciosService>(ServiciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
