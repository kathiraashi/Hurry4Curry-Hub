import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiveproductsComponent } from './view-receiveproducts.component';

describe('ViewReceiveproductsComponent', () => {
  let component: ViewReceiveproductsComponent;
  let fixture: ComponentFixture<ViewReceiveproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiveproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceiveproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
