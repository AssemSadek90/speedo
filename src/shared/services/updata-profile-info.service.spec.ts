import { TestBed } from '@angular/core/testing';

import { UpdataProfileInfoService } from './updata-profile-info.service';

describe('UpdataProfileInfoService', () => {
  let service: UpdataProfileInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdataProfileInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
