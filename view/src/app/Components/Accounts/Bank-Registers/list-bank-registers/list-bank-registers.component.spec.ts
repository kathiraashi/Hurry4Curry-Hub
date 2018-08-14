import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankRegistersComponent } from './list-bank-registers.component';

describe('ListBankRegistersComponent', () => {
  let component: ListBankRegistersComponent;
  let fixture: ComponentFixture<ListBankRegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBankRegistersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBankRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
