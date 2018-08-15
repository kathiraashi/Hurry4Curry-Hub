import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-stock-values',
  templateUrl: './list-stock-values.component.html',
  styleUrls: ['./list-stock-values.component.css']
})
export class ListStockValuesComponent implements OnInit {

  bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  DeleteStockValues() {
    const initialState = {
       Text: 'StockValues'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
 }

}
