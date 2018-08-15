import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFranchiseeComponent } from './view-franchisee.component';

describe('ViewFranchiseeComponent', () => {
  let component: ViewFranchiseeComponent;
  let fixture: ComponentFixture<ViewFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
