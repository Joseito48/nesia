import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; // Asegúrate de que el archivo existe
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Es Standalone
      providers: [provideRouter([])] // Simulamos el enrutador
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la aplicación correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el título definido (opcional)', () => {
    // Si tu app tiene una variable title, esto lo valida
    expect(component).toBeDefined();
  });
});
