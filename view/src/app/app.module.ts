// Default Modules
   import { NgModule } from '@angular/core';
   import { CommonModule} from '@angular/common';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { HttpModule } from '@angular/http';
   import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   import { RouterModule, Routes } from '@angular/router';

// Default Components
   import { AppComponent } from './app.component';

// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule} from '@angular/material';
   import { NgSelectModule } from '@ng-select/ng-select';

// Custom Modules
   import { AppRoutingModule } from './app.routing.module';
   import { AuthGuard } from './Authentication/auth.guard';

// Custom Components
   // Component Folder
      // Common-Components ---------------------------------------------------
         import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
         import { HeaderComponent } from './Components/Common-Components/header/header.component';
         import { LoginComponent } from './Components/Common-Components/login/login.component';

    // Inventory folder
        // Inventory_Request
        import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
        import { PurchaseRequestCreateComponent } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
        import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';

import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';


import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
import { ListStockValuesComponent } from './Components/Purchase/Stock-Values/list-stock-values/list-stock-values.component';
import { ViewStockValuesComponent } from './Components/Purchase/Stock-Values/view-stock-values/view-stock-values.component';
import { ListBankRegistersComponent } from './Components/Accounts/Bank-Registers/list-bank-registers/list-bank-registers.component';
import { ListCashRegistersComponent } from './Components/Accounts/Cash-Registers/list-cash-registers/list-cash-registers.component';
import { ListChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/list-cheque-entries/list-cheque-entries.component';
import { ViewChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/view-cheque-entries/view-cheque-entries.component';
import { DashBoardComponent } from './Components/DashBoard/dash-board/dash-board.component';
import { CreateFranchiseeComponent } from './Components/Sales/Franchisee/create-franchisee/create-franchisee.component';
import { ListFranchiseeComponent } from './Components/Sales/Franchisee/list-franchisee/list-franchisee.component';
import { ViewFranchiseeComponent } from './Components/Sales/Franchisee/view-franchisee/view-franchisee.component';
import { CreateBillComponent } from './Components/Sales/Bill/create-bill/create-bill.component';
import { ListBillComponent } from './Components/Sales/Bill/list-bill/list-bill.component';
import { ViewBillComponent } from './Components/Sales/Bill/view-bill/view-bill.component';
import { ListPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/list-purchase-bills/list-purchase-bills.component';
import { ViewPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/view-purchase-bills/view-purchase-bills.component';
import { CreateFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/create-franchisee-payments/create-franchisee-payments.component';
import { ListFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/list-franchisee-payments/list-franchisee-payments.component';
import { ViewFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/view-franchisee-payments/view-franchisee-payments.component';
import { ListReceiveproductsComponent } from './Components/Purchase/Receive-Products/list-receiveproducts/list-receiveproducts.component';
import { ViewReceiveproductsComponent } from './Components/Purchase/Receive-Products/view-receiveproducts/view-receiveproducts.component';
import { ModelUpdateYieldComponent } from './models/Inventory/model-update-yield/model-update-yield.component';
import { ListDeliverProductsComponent } from './Components/Purchase/Deliver-Products/list-deliver-products/list-deliver-products.component';
import { ViewDeliverProductsComponent } from './Components/Purchase/Deliver-Products/view-deliver-products/view-deliver-products.component';


@NgModule({
   declarations: [
      // Default Components
         AppComponent,
      // Custom Components
         // Component Folder
            // Common-Components Folder
              HeaderComponent,
    // Common-Components
        // delete-confirmation
                 DeleteConfirmationComponent,
    // Inventory Folder
        // Inventory Request
        PurchaseRequestListComponent,
        PurchaseRequestCreateComponent,
        PurchaseRequestViewComponent,
        VendorPaymentsListComponent,
            VendorPaymentsViewComponent,
            LoginComponent,
            DashBoardComponent,
            ListProductComponent,
            CreateProductComponent,
            ViewProductComponent,
            ListStockValuesComponent,
            ViewStockValuesComponent,
            ListBankRegistersComponent,
            ListCashRegistersComponent,
             ListChequeEntriesComponent,
            ViewChequeEntriesComponent,
            DashBoardComponent,
            CreateFranchiseeComponent,
            ListFranchiseeComponent,
            ViewFranchiseeComponent,
            CreateBillComponent,
            ListBillComponent,
            ViewBillComponent,
            ListPurchaseBillsComponent,
            ViewPurchaseBillsComponent,
            CreateFranchiseePaymentsComponent,
            ListFranchiseePaymentsComponent,
            ViewFranchiseePaymentsComponent,
            ListReceiveproductsComponent,
            ViewReceiveproductsComponent,
            ModelUpdateYieldComponent,
            ListDeliverProductsComponent,
            ViewDeliverProductsComponent


   ],
   imports: [
      // Default Modules
         BrowserModule,
         BrowserAnimationsModule,
         RouterModule,
         HttpModule,
         HttpClientModule,
         FormsModule,
         ReactiveFormsModule,
      // future modules
         ModalModule.forRoot(),
         AccordionModule.forRoot(),
         CalendarModule,
         NgSelectModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSelectModule,
         MatCheckboxModule,
         MatMenuModule,
      // Custom Modules
         AppRoutingModule,
   ],
   providers: [AuthGuard],
   entryComponents: [
      DeleteConfirmationComponent,
      ModelUpdateYieldComponent
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }

