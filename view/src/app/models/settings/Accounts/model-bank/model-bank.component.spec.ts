import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBankComponent } from './model-bank.component';

describe('ModelBankComponent', () => {
  let component: ModelBankComponent;
  let fixture: ComponentFixture<ModelBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
