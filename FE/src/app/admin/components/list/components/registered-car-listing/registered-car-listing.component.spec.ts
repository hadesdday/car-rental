import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarListingComponent } from './registered-car-listing.component';

describe('RegisteredCarListingComponent', () => {
  let component: RegisteredCarListingComponent;
  let fixture: ComponentFixture<RegisteredCarListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredCarListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredCarListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
