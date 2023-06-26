import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarFeatureComponent } from './add-car-feature.component';

describe('AddCarFeatureComponent', () => {
  let component: AddCarFeatureComponent;
  let fixture: ComponentFixture<AddCarFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
