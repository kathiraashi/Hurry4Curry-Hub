import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeBillListComponent } from './franchisee-bill-list.component';

describe('FranchiseeBillListComponent', () => {
  let component: FranchiseeBillListComponent;
  let fixture: ComponentFixture<FranchiseeBillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeBillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
