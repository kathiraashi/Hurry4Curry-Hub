import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseBillsComponent } from './view-purchase-bills.component';

describe('ViewPurchaseBillsComponent', () => {
  let component: ViewPurchaseBillsComponent;
  let fixture: ComponentFixture<ViewPurchaseBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
