import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLocationComponent } from './my-location.component';

describe('MyLocationComponent', () => {
  let component: MyLocationComponent;
  let fixture: ComponentFixture<MyLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
