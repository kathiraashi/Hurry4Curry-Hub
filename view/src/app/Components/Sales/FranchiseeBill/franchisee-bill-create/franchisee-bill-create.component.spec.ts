import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeBillCreateComponent } from './franchisee-bill-create.component';

describe('FranchiseeBillCreateComponent', () => {
  let component: FranchiseeBillCreateComponent;
  let fixture: ComponentFixture<FranchiseeBillCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeBillCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeBillCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
