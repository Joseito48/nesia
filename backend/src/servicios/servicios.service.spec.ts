import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosService } from './servicios.service';
import { getModelToken } from '@nestjs/mongoose';
import { Servicio } from './entities/servicio.entity';

describe('ServiciosService', () => {
  let service: ServiciosService;

  // 1. Creamos un "doble" (Mock) de la base de datos de MongoDB
  const mockServicioModel = {
    // Simulamos la función find().exec() que usas en tu servicio
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        { title: 'Lavado Premium', price: 80, description: 'Limpieza total' }
      ]),
    }),
    // Si en el futuro quisieras testear el borrado o la creación, los pondrías aquí:
    findByIdAndDelete: jest.fn().mockResolvedValue({ title: 'Lavado Premium' }),
    create: jest.fn().mockResolvedValue({ title: 'Nuevo Servicio' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiciosService,
        // 2. Le inyectamos nuestro "doble" para que no intente usar la BD real
        {
          provide: getModelToken(Servicio.name),
          useValue: mockServicioModel,
        },
      ],
    }).compile();

    service = module.get<ServiciosService>(ServiciosService);
  });

  // Test 1: Comprueba que el servicio arranca sin errores
  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  // Test 2: La "Evidencia de Validación" real para la profesora
  it('debe retornar el catálogo de servicios (findAll)', async () => {
    // Ejecutamos la función de tu servicio
    const servicios = await service.findAll();
    
    // Validamos que el resultado es correcto
    expect(servicios).toBeInstanceOf(Array);
    expect(servicios.length).toBeGreaterThan(0);
    expect(servicios[0].title).toEqual('Lavado Premium');
    expect(servicios[0].price).toEqual(80);
  });
});