import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCashRegistersComponent } from './list-cash-registers.component';

describe('ListCashRegistersComponent', () => {
  let component: ListCashRegistersComponent;
  let fixture: ComponentFixture<ListCashRegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCashRegistersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCashRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
