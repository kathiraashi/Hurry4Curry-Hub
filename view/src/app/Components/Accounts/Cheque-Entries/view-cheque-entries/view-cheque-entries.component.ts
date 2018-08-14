import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cheque-entries',
  templateUrl: './view-cheque-entries.component.html',
  styleUrls: ['./view-cheque-entries.component.css']
})
export class ViewChequeEntriesComponent implements OnInit {
Active_Tab = 'Posponed';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
