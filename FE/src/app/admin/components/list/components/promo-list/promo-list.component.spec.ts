import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoListComponent } from './promo-list.component';

describe('PromoListComponent', () => {
  let component: PromoListComponent;
  let fixture: ComponentFixture<PromoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
