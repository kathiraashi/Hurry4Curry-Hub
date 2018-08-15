import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFranchiseePaymentsComponent } from './create-franchisee-payments.component';

describe('CreateFranchiseePaymentsComponent', () => {
  let component: CreateFranchiseePaymentsComponent;
  let fixture: ComponentFixture<CreateFranchiseePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFranchiseePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFranchiseePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
