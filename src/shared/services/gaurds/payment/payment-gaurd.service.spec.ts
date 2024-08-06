import { TestBed } from '@angular/core/testing';

import { PaymentGaurdService } from '../payment-gaurd.service';

describe('PaymentGaurdService', () => {
  let service: PaymentGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
