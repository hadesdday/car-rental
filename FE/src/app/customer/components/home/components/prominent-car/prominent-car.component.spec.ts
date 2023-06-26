import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProminentCarComponent } from './prominent-car.component';

describe('ProminentCarComponent', () => {
  let component: ProminentCarComponent;
  let fixture: ComponentFixture<ProminentCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProminentCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProminentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
