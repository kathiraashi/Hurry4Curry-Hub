import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeBillViewComponent } from './franchisee-bill-view.component';

describe('FranchiseeBillViewComponent', () => {
  let component: FranchiseeBillViewComponent;
  let fixture: ComponentFixture<FranchiseeBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
