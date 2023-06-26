import { TestBed } from '@angular/core/testing';

import { RegisteredCarService } from './registered-car.service';

describe('RegisteredCarService', () => {
  let service: RegisteredCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
