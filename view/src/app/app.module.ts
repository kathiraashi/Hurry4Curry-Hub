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
   import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
   import {MatRadioModule} from '@angular/material/radio';
   import { NgSelectModule } from '@ng-select/ng-select';
   import { ChipsModule } from 'primeng/chips';

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
import { EditFranchiseeComponent } from './Components/Sales/Franchisee/edit-franchisee/edit-franchisee.component';
import { CreateBillComponent } from './Components/Sales/Bill/create-bill/create-bill.component';
import { ListBillComponent } from './Components/Sales/Bill/list-bill/list-bill.component';
import { ViewBillComponent } from './Components/Sales/Bill/view-bill/view-bill.component';
import { ListPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/list-purchase-bills/list-purchase-bills.component';
import { ViewPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/view-purchase-bills/view-purchase-bills.component';
import { CreatePurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/create-purchase-bills/create-purchase-bills.component';
import { CreateFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/create-franchisee-payments/create-franchisee-payments.component';
import { ListFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/list-franchisee-payments/list-franchisee-payments.component';
import { ViewFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/view-franchisee-payments/view-franchisee-payments.component';
import { ListReceiveproductsComponent } from './Components/Purchase/Receive-Products/list-receiveproducts/list-receiveproducts.component';
import { ViewReceiveproductsComponent } from './Components/Purchase/Receive-Products/view-receiveproducts/view-receiveproducts.component';
import { ModelUpdateYieldComponent } from './models/Inventory/model-update-yield/model-update-yield.component';
import { ListDeliverProductsComponent } from './Components/Purchase/Deliver-Products/list-deliver-products/list-deliver-products.component';
import { ViewDeliverProductsComponent } from './Components/Purchase/Deliver-Products/view-deliver-products/view-deliver-products.component';
import { RegisterPaymentsComponent } from './Components/Accounts/Payments/register-payments/register-payments.component';
import { CreateLogExpensesComponent } from './Components/Accounts/Log-Expenses/create-log-expenses/create-log-expenses.component';
import { ListLogExpensesComponent } from './Components/Accounts/Log-Expenses/list-log-expenses/list-log-expenses.component';
import { ViewLogExpensesComponent } from './Components/Accounts/Log-Expenses/view-log-expenses/view-log-expenses.component';
import { CreateCustomerComponent } from './Components/Sales/Customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './Components/Sales/Customer/edit-customer/edit-customer.component';
import { ListCustomerComponent } from './Components/Sales/Customer/list-customer/list-customer.component';
import { ViewCustomerComponent } from './Components/Sales/Customer/view-customer/view-customer.component';
import { ModelUpdateQuantityComponent } from './models/Products/model-update-quantity/model-update-quantity.component';
import { ModelPaymentMethodComponent } from './models/Payment/model-payment-method/model-payment-method.component';
import { FranchiseeBillCreateComponent } from './Components/Sales/FranchiseeBill/franchisee-bill-create/franchisee-bill-create.component';
import { FranchiseeBillListComponent } from './Components/Sales/FranchiseeBill/franchisee-bill-list/franchisee-bill-list.component';
import { FranchiseeBillViewComponent } from './Components/Sales/FranchiseeBill/franchisee-bill-view/franchisee-bill-view.component';
import { AccountSettingsMainComponent } from './Components/settings/AccountSettings/account-settings-main/account-settings-main.component';
import { BankComponent } from './Components/settings/AccountSettings/SubComponents/bank/bank.component';
import { ExpenseTypeComponent } from './Components/settings/AccountSettings/SubComponents/expense-type/expense-type.component';
import { ModelBankComponent } from './models/settings/Accounts/model-bank/model-bank.component';
import { ModelExpenseTypeComponent } from './models/settings/Accounts/model-expense-type/model-expense-type.component';
import { ListFranchiseeOrderComponent } from './Components/Purchase/Franchisee-Order/list-franchisee-order/list-franchisee-order.component';
import { ViewFranchiseeOrderComponent } from './Components/Purchase/Franchisee-Order/view-franchisee-order/view-franchisee-order.component';


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
            ViewDeliverProductsComponent,
            RegisterPaymentsComponent,
            CreateLogExpensesComponent,
            ListLogExpensesComponent,
            ViewLogExpensesComponent,
            EditFranchiseeComponent,
            CreateCustomerComponent,
            EditCustomerComponent,
            ListCustomerComponent,
            ViewCustomerComponent,
            ModelUpdateQuantityComponent,
            ModelPaymentMethodComponent,
            CreatePurchaseBillsComponent,
            FranchiseeBillCreateComponent,
            FranchiseeBillListComponent,
            FranchiseeBillViewComponent,
            AccountSettingsMainComponent,
            BankComponent,
            ExpenseTypeComponent,
            ModelBankComponent,
            ModelExpenseTypeComponent,
            ListFranchiseeOrderComponent,
            ViewFranchiseeOrderComponent

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
         MatRadioModule,
         ChipsModule,
      // Custom Modules
         AppRoutingModule,
      //  Material Date picker
         BsDatepickerModule.forRoot(),
   ],
   providers: [AuthGuard],
   entryComponents: [
      DeleteConfirmationComponent,
      ModelUpdateYieldComponent,
      ModelUpdateQuantityComponent,
      ModelBankComponent,
      ModelExpenseTypeComponent
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }

