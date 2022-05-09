import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReservasComponent } from './ver-reservas.component';

describe('VerReservasComponent', () => {
  let component: VerReservasComponent;
  let fixture: ComponentFixture<VerReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
