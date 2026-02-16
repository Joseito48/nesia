import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galeria } from './galeria';

describe('Galeria', () => {
  let component: Galeria;
  let fixture: ComponentFixture<Galeria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galeria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Galeria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
