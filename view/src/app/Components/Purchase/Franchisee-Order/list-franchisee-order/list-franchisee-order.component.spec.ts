import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFranchiseeOrderComponent } from './list-franchisee-order.component';

describe('ListFranchiseeOrderComponent', () => {
  let component: ListFranchiseeOrderComponent;
  let fixture: ComponentFixture<ListFranchiseeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFranchiseeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFranchiseeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
