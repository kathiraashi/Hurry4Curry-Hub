import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFranchiseePaymentsComponent } from './list-franchisee-payments.component';

describe('ListFranchiseePaymentsComponent', () => {
  let component: ListFranchiseePaymentsComponent;
  let fixture: ComponentFixture<ListFranchiseePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFranchiseePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFranchiseePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
