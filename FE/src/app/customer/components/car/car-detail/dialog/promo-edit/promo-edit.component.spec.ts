import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEditComponent } from './promo-edit.component';

describe('PromoEditComponent', () => {
  let component: PromoEditComponent;
  let fixture: ComponentFixture<PromoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
