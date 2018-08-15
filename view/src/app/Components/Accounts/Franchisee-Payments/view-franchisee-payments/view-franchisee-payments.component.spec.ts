import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFranchiseePaymentsComponent } from './view-franchisee-payments.component';

describe('ViewFranchiseePaymentsComponent', () => {
  let component: ViewFranchiseePaymentsComponent;
  let fixture: ComponentFixture<ViewFranchiseePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFranchiseePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFranchiseePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
