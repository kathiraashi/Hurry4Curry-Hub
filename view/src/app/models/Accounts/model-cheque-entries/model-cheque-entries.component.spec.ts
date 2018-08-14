import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelChequeEntriesComponent } from './model-cheque-entries.component';

describe('ModelChequeEntriesComponent', () => {
  let component: ModelChequeEntriesComponent;
  let fixture: ComponentFixture<ModelChequeEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelChequeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelChequeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
