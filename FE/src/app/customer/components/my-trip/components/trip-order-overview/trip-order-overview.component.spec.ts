import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOrderOverviewComponent } from './trip-order-overview.component';

describe('TripOrderOverviewComponent', () => {
  let component: TripOrderOverviewComponent;
  let fixture: ComponentFixture<TripOrderOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripOrderOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
