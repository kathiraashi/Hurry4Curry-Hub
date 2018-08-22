import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogExpensesComponent } from './list-log-expenses.component';

describe('ListLogExpensesComponent', () => {
  let component: ListLogExpensesComponent;
  let fixture: ComponentFixture<ListLogExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLogExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLogExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
