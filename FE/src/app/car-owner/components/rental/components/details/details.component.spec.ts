import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: RentalDetailsComponent;
  let fixture: ComponentFixture<RentalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
