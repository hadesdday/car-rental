import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoDetailComponent } from './promo-detail.component';

describe('PromoDetailComponent', () => {
  let component: PromoDetailComponent;
  let fixture: ComponentFixture<PromoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
