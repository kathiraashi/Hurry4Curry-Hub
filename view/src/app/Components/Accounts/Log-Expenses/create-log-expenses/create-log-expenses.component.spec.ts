import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogExpensesComponent } from './create-log-expenses.component';

describe('CreateLogExpensesComponent', () => {
  let component: CreateLogExpensesComponent;
  let fixture: ComponentFixture<CreateLogExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLogExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLogExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
