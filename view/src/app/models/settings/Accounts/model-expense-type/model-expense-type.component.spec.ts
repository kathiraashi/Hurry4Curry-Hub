import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExpenseTypeComponent } from './model-expense-type.component';

describe('ModelExpenseTypeComponent', () => {
  let component: ModelExpenseTypeComponent;
  let fixture: ComponentFixture<ModelExpenseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelExpenseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
