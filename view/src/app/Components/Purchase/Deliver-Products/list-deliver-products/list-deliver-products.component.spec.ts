import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliverProductsComponent } from './list-deliver-products.component';

describe('ListDeliverProductsComponent', () => {
  let component: ListDeliverProductsComponent;
  let fixture: ComponentFixture<ListDeliverProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeliverProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeliverProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
