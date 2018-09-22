import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsMainComponent } from './account-settings-main.component';

describe('AccountSettingsMainComponent', () => {
  let component: AccountSettingsMainComponent;
  let fixture: ComponentFixture<AccountSettingsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
