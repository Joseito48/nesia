import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaModalComponent } from './reserva-modal.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReservaModalComponent', () => {
  let component: ReservaModalComponent;
  let fixture: ComponentFixture<ReservaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaModalComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() // Simulamos la petición POST de enviar la reserva
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente del modal de reservas', () => {
    expect(component).toBeTruthy();
  });
});