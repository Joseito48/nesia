import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaComponent } from './galeria.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('GaleriaComponent', () => {
  let component: GaleriaComponent;
  let fixture: ComponentFixture<GaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente de la galería', () => {
    expect(component).toBeTruthy();
  });
});