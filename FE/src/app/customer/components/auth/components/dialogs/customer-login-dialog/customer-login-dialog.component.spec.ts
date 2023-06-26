import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoginDialogComponent } from './customer-login-dialog.component';

describe('CustomerLoginDialogComponent', () => {
  let component: CustomerLoginDialogComponent;
  let fixture: ComponentFixture<CustomerLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLoginDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
