import { TestBed } from '@angular/core/testing';

import { MyAcountGaurdService } from './my-acount-gaurd.service';

describe('MyAcountGaurdService', () => {
  let service: MyAcountGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAcountGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
