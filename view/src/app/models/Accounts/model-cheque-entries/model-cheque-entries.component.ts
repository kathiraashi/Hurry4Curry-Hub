import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-cheque-entries',
  templateUrl: './model-cheque-entries.component.html',
  styleUrls: ['./model-cheque-entries.component.css']
})
export class ModelChequeEntriesComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
