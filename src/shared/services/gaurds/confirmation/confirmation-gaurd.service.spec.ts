import { TestBed } from '@angular/core/testing';

import { ConfirmationGaurdService } from './confirmation-gaurd.service';

describe('ConfirmationGaurdService', () => {
  let service: ConfirmationGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
