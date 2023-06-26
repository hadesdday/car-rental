import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripComponent } from './my-trip.component';

describe('MyTripComponent', () => {
  let component: MyTripComponent;
  let fixture: ComponentFixture<MyTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
