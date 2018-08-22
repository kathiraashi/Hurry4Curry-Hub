import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogExpensesComponent } from './view-log-expenses.component';

describe('ViewLogExpensesComponent', () => {
  let component: ViewLogExpensesComponent;
  let fixture: ComponentFixture<ViewLogExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
