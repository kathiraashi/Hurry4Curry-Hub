import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings-main',
  templateUrl: './account-settings-main.component.html',
  styleUrls: ['./account-settings-main.component.css']
})
export class AccountSettingsMainComponent implements OnInit {

   Active_Tab = 'Bank';

   constructor() { }

   ngOnInit() {
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }


}
