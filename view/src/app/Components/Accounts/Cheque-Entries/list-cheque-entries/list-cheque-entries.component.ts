import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelChequeEntriesComponent } from '../../../../models/Accounts/model-cheque-entries/model-cheque-entries.component';

@Component({
  selector: 'app-list-cheque-entries',
  templateUrl: './list-cheque-entries.component.html',
  styleUrls: ['./list-cheque-entries.component.css']
})
export class ListChequeEntriesComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateChequeEntries() {
    const initialState = {
       Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelChequeEntriesComponent, Object.assign({initialState}, { class: 'modal-md' }));
 }
}
