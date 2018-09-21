import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUpdateQuantityComponent } from './model-update-quantity.component';

describe('ModelUpdateQuantityComponent', () => {
  let component: ModelUpdateQuantityComponent;
  let fixture: ComponentFixture<ModelUpdateQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelUpdateQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUpdateQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
