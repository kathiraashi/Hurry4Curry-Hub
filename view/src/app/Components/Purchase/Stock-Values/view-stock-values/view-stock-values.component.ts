import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-stock-values',
  templateUrl: './view-stock-values.component.html',
  styleUrls: ['./view-stock-values.component.css']
})
export class ViewStockValuesComponent implements OnInit {
Active_Tab = 'History';
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
this.Active_Tab = name;
  }

}
