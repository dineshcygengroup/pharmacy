import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// flex layout module
import { FlexLayoutModule } from "@angular/flex-layout";

// Material modules
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { NgxPrintModule } from 'ngx-print';

// our modules
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { DialogModule } from '../dialog/dialog.module';

import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { ViewSupplierListComponent } from './view-supplier-list/view-supplier-list.component';
import { CoreModule } from '../core/core.module';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { OrderMedicineComponent } from './order-medicine/order-medicine.component';
import { PharmacyRootComponent } from './pharmacy-root/pharmacy-root.component';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { MedicineOrderListComponent } from './medicine-order-list/medicine-order-list.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineSaleComponent } from './medicine-sale/medicine-sale.component';
import { SaleListComponent } from './sale-list/sale-list.component';

@NgModule({
  declarations: [
    AddSupplierComponent,
    ViewSupplierListComponent,
    AddMedicineComponent,
    OrderMedicineComponent,
    PharmacyRootComponent,
    PopupDialogComponent,
    MedicineOrderListComponent,
    MedicineListComponent,
    MedicineSaleComponent,
    SaleListComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    CoreModule,
    CustomComponentsModule,
    DialogModule,
    NgxPrintModule
  ],
  exports: [ ]
})
export class PharmacyModule { }