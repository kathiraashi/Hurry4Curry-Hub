import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBankRegisterComponent } from './model-bank-register.component';

describe('ModelBankRegisterComponent', () => {
  let component: ModelBankRegisterComponent;
  let fixture: ComponentFixture<ModelBankRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBankRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBankRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
