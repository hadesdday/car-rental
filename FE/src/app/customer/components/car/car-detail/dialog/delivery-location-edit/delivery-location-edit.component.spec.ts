import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationEditComponent } from './delivery-location-edit.component';

describe('DeliveryLocationEditComponent', () => {
  let component: DeliveryLocationEditComponent;
  let fixture: ComponentFixture<DeliveryLocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
