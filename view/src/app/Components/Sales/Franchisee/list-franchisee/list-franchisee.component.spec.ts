import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFranchiseeComponent } from './list-franchisee.component';

describe('ListFranchiseeComponent', () => {
  let component: ListFranchiseeComponent;
  let fixture: ComponentFixture<ListFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
