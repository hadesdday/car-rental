import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateSvgComponent } from './certificate-svg.component';

describe('CertificateSvgComponent', () => {
  let component: CertificateSvgComponent;
  let fixture: ComponentFixture<CertificateSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
