import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-crm-customers-list',
  templateUrl: './crm-customers-list.component.html',
  styleUrls: ['./crm-customers-list.component.css']
})
export class CrmCustomersListComponent implements OnInit {


  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }

  DeleteCustomers() {
    const initialState = {
       Text: 'Customers'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }

}