import { TestBed, inject } from '@angular/core/testing';

import { PurchaseBillService } from './purchase-bill.service';

describe('PurchaseBillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseBillService]
    });
  });

  it('should be created', inject([PurchaseBillService], (service: PurchaseBillService) => {
    expect(service).toBeTruthy();
  }));
});
