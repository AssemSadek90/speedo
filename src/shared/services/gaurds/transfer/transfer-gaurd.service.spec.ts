import { TestBed } from '@angular/core/testing';

import { TransferGaurdService } from './transfer-gaurd.service';

describe('TransferGaurdService', () => {
  let service: TransferGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
