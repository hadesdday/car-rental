import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoItemComponent } from './promo-item.component';

describe('PromoItemComponent', () => {
  let component: PromoItemComponent;
  let fixture: ComponentFixture<PromoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
