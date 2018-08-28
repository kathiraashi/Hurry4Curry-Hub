import { TestBed, inject } from '@angular/core/testing';

import { FranchiseeService } from './franchisee.service';

describe('FranchiseeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranchiseeService]
    });
  });

  it('should be created', inject([FranchiseeService], (service: FranchiseeService) => {
    expect(service).toBeTruthy();
  }));
});
