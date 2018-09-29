import { TestBed, inject } from '@angular/core/testing';

import { DeliverProductsService } from './deliver-products.service';

describe('DeliverProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliverProductsService]
    });
  });

  it('should be created', inject([DeliverProductsService], (service: DeliverProductsService) => {
    expect(service).toBeTruthy();
  }));
});
