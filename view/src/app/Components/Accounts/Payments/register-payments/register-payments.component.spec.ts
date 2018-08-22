import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPaymentsComponent } from './register-payments.component';

describe('RegisterPaymentsComponent', () => {
  let component: RegisterPaymentsComponent;
  let fixture: ComponentFixture<RegisterPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
