import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavsComponent } from './my-favs.component';

describe('MyFavsComponent', () => {
  let component: MyFavsComponent;
  let fixture: ComponentFixture<MyFavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
