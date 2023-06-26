import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDealComponent } from './module-deal.component';

describe('ModuleDealComponent', () => {
  let component: ModuleDealComponent;
  let fixture: ComponentFixture<ModuleDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleDealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
