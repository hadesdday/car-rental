import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelSvgComponent } from './wheel-svg.component';

describe('WheelSvgComponent', () => {
  let component: WheelSvgComponent;
  let fixture: ComponentFixture<WheelSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
