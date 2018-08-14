import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { ModelBankRegisterComponent } from '../../../../models/Accounts/model-bank-register/model-bank-register.component';
@Component({
  selector: 'app-list-bank-registers',
  templateUrl: './list-bank-registers.component.html',
  styleUrls: ['./list-bank-registers.component.css']
})
export class ListBankRegistersComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateBankRegister() {
    const initialState = {
       Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelBankRegisterComponent, Object.assign({initialState}, { class: 'modal-md' }));
 }
 ViewBankRegister() {
  const initialState = {
    Type: 'View'
  };
  this.bsModalRef = this.modalService.show(ModelBankRegisterComponent, Object.assign({initialState}, { class: 'modal-md' }));
}

  DeleteBankRegister() {
    const initialState = {
       Text: 'BankRegister'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }


}
