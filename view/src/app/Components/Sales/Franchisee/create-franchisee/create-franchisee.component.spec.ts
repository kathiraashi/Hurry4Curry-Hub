import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFranchiseeComponent } from './create-franchisee.component';

describe('CreateFranchiseeComponent', () => {
  let component: CreateFranchiseeComponent;
  let fixture: ComponentFixture<CreateFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
