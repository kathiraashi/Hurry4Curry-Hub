import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUpdateYieldComponent } from './model-update-yield.component';

describe('ModelUpdateYieldComponent', () => {
  let component: ModelUpdateYieldComponent;
  let fixture: ComponentFixture<ModelUpdateYieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelUpdateYieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUpdateYieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
