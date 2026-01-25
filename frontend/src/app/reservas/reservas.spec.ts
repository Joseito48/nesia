import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <--- ESTO ES LA CLAVE
import { ReservasService } from './reservas.service';

describe('ReservasService', () => {
  let service: ReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importamos el módulo de testing para simular peticiones HTTP
      // sin tener que contactar al backend real
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(ReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});