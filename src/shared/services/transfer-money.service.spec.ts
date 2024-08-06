import { TestBed } from '@angular/core/testing';

import { TransferMoneyService } from './transfer-money.service';

describe('TransferMoneyService', () => {
  let service: TransferMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
