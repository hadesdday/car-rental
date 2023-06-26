import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpValidationComponent } from './otp-validation.component';

describe('OtpValidationComponent', () => {
  let component: OtpValidationComponent;
  let fixture: ComponentFixture<OtpValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
