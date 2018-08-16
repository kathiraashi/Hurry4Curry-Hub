import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceiveproductsComponent } from './list-receiveproducts.component';

describe('ListReceiveproductsComponent', () => {
  let component: ListReceiveproductsComponent;
  let fixture: ComponentFixture<ListReceiveproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceiveproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceiveproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
