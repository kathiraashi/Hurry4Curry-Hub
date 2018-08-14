import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChequeEntriesComponent } from './list-cheque-entries.component';

describe('ListChequeEntriesComponent', () => {
  let component: ListChequeEntriesComponent;
  let fixture: ComponentFixture<ListChequeEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChequeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChequeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
