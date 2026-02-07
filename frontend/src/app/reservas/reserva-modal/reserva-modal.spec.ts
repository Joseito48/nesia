import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaModalComponent } from './reserva-modal.component'; // Asegúrate del nombre
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReservasService } from '../reservas.service';
import { ServiciosService } from '../../servicios/servicios.service';
import { of } from 'rxjs';

describe('ReservaModalComponent', () => {
  let component: ReservaModalComponent;
  let fixture: ComponentFixture<ReservaModalComponent>;

  // Creamos "Mocks" (simulaciones) para que el test no intente llamar a la API real
  const reservasServiceMock = {
    crearReserva: () => of({ success: true })
  };
  const serviciosServiceMock = {
    getServicios: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 1. Importas el componente (si es standalone)
      imports: [ReservaModalComponent],
      // 2. Proporcionas el cliente HTTP y los mocks de tus servicios
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ReservasService, useValue: reservasServiceMock },
        { provide: ServiciosService, useValue: serviciosServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta el ciclo de vida inicial (ngOnInit)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});