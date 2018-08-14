import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-bank-register',
  templateUrl: './model-bank-register.component.html',
  styleUrls: ['./model-bank-register.component.css']
})
export class ModelBankRegisterComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }


}
