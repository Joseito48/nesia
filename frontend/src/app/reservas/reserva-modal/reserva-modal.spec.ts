import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaModal } from './reserva-modal.component';

describe('ReservaModal', () => {
  let component: ReservaModal;
  let fixture: ComponentFixture<ReservaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
