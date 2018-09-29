import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFranchiseeOrderComponent } from './view-franchisee-order.component';

describe('ViewFranchiseeOrderComponent', () => {
  let component: ViewFranchiseeOrderComponent;
  let fixture: ComponentFixture<ViewFranchiseeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFranchiseeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFranchiseeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
