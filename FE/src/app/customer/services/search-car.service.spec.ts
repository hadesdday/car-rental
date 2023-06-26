import { TestBed } from '@angular/core/testing';

import { SearchCarService } from './search-car.service';

describe('SearchCarService', () => {
  let service: SearchCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
