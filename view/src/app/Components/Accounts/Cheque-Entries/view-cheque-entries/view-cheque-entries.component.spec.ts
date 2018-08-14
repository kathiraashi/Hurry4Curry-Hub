import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequeEntriesComponent } from './view-cheque-entries.component';

describe('ViewChequeEntriesComponent', () => {
  let component: ViewChequeEntriesComponent;
  let fixture: ComponentFixture<ViewChequeEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChequeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChequeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
