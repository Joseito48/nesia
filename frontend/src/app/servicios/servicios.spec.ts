import { TestBed } from '@angular/core/testing';
import { ServiciosService } from './servicios.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiciosService', () => {
  let service: ServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiciosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});