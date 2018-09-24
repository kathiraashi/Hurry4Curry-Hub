import { TestBed, inject } from '@angular/core/testing';

import { BankRegisterService } from './bank-register.service';

describe('BankRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankRegisterService]
    });
  });

  it('should be created', inject([BankRegisterService], (service: BankRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
