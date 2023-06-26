import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQrComponent } from './profile-qr.component';

describe('ProfileQrComponent', () => {
  let component: ProfileQrComponent;
  let fixture: ComponentFixture<ProfileQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
