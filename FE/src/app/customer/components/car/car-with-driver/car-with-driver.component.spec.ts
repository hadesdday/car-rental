import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWithDriverComponent } from './car-with-driver.component';

describe('CarWithDriverComponent', () => {
  let component: CarWithDriverComponent;
  let fixture: ComponentFixture<CarWithDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarWithDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarWithDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
