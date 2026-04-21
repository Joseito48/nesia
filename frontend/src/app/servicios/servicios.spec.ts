import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosComponent } from './servicios.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosComponent], // Componente Standalone
      providers: [
        provideHttpClient(), 
        provideHttpClientTesting() // Simulador de peticiones HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente de servicios', () => {
    expect(component).toBeTruthy();
  });
});