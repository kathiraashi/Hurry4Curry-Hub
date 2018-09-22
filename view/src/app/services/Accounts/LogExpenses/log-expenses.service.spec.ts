import { TestBed, inject } from '@angular/core/testing';

import { LogExpensesService } from './log-expenses.service';

describe('LogExpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogExpensesService]
    });
  });

  it('should be created', inject([LogExpensesService], (service: LogExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
