import { TestBed, inject } from '@angular/core/testing';

import { FranshiseOrderService } from './franshise-order.service';

describe('FranshiseOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranshiseOrderService]
    });
  });

  it('should be created', inject([FranshiseOrderService], (service: FranshiseOrderService) => {
    expect(service).toBeTruthy();
  }));
});
