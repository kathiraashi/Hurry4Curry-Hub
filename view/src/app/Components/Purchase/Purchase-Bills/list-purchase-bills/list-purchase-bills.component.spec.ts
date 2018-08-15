import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchaseBillsComponent } from './list-purchase-bills.component';

describe('ListPurchaseBillsComponent', () => {
  let component: ListPurchaseBillsComponent;
  let fixture: ComponentFixture<ListPurchaseBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchaseBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchaseBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
