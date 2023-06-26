import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnerComponent } from './car-owner.component';

describe('CarOwnerComponent', () => {
  let component: CarOwnerComponent;
  let fixture: ComponentFixture<CarOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
