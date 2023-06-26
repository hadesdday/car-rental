import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectDialogComponent } from './redirect-dialog.component';

describe('RedirectDialogComponent', () => {
  let component: RedirectDialogComponent;
  let fixture: ComponentFixture<RedirectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
