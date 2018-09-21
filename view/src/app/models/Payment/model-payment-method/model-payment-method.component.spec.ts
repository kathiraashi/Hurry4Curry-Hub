import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPaymentMethodComponent } from './model-payment-method.component';

describe('ModelPaymentMethodComponent', () => {
  let component: ModelPaymentMethodComponent;
  let fixture: ComponentFixture<ModelPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
