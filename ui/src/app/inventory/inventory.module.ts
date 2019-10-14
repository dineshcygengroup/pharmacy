// Angular imports
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

// Custom imports
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { CoreModule } from '../core/core.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormBuilderService, HttpRequestHandlerService } from '../core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { AddPurchaseOrderComponent } from './components/add-purchase-order/add-purchase-order.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderSummaryComponent } from './components/purchase-order-summary/purchase-order-summary.component';

// services
import { ConfigReaderService } from './services/config-reader.service';

@NgModule({
  declarations: [
    AddProductComponent,
    AddVendorComponent,
    DashboardComponent,
    ProductsListComponent,
    VendorListComponent,
    AddPurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseOrderSummaryComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    InventoryRoutingModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    FormBuilderService,
    HttpRequestHandlerService,
    ConfigReaderService
  ]
})
export class InventoryModule { }
