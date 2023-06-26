import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListingComponent } from './car-listing.component';

describe('CarListingComponent', () => {
  let component: CarListingComponent;
  let fixture: ComponentFixture<CarListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
