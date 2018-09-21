import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseBillsComponent } from './create-purchase-bills.component';

describe('CreatePurchaseBillsComponent', () => {
  let component: CreatePurchaseBillsComponent;
  let fixture: ComponentFixture<CreatePurchaseBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePurchaseBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
