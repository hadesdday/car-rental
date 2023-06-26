import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProminentPlaceComponent } from './prominent-place.component';

describe('ProminentPlaceComponent', () => {
  let component: ProminentPlaceComponent;
  let fixture: ComponentFixture<ProminentPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProminentPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProminentPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
