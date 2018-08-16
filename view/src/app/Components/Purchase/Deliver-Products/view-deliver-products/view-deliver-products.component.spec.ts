import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliverProductsComponent } from './view-deliver-products.component';

describe('ViewDeliverProductsComponent', () => {
  let component: ViewDeliverProductsComponent;
  let fixture: ComponentFixture<ViewDeliverProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliverProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliverProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
