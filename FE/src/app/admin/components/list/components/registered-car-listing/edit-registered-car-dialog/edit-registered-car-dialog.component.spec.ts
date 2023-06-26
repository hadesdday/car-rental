import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisteredCarDialogComponent } from './edit-registered-car-dialog.component';

describe('EditRegisteredCarDialogComponent', () => {
  let component: EditRegisteredCarDialogComponent;
  let fixture: ComponentFixture<EditRegisteredCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRegisteredCarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRegisteredCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
