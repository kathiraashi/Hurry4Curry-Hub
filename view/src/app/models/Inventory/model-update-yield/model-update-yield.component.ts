import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-update-yield',
  templateUrl: './model-update-yield.component.html',
  styleUrls: ['./model-update-yield.component.css']
})
export class ModelUpdateYieldComponent implements OnInit {

  TodayDate = new Date().toLocaleDateString('en-GB');

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}
  ngOnInit() {
  }

}
