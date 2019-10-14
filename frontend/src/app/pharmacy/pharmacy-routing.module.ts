import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { ViewSupplierListComponent } from './view-supplier-list/view-supplier-list.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { OrderMedicineComponent } from './order-medicine/order-medicine.component';
import { PharmacyRootComponent } from './pharmacy-root/pharmacy-root.component';
import { MedicineOrderListComponent } from './medicine-order-list/medicine-order-list.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineSaleComponent } from './medicine-sale/medicine-sale.component';
import { SaleListComponent } from './sale-list/sale-list.component';

const routes: Routes = [
  {
    path: '',
    component: PharmacyRootComponent,
    children: [
      { path: 'addsupplier',  component: AddSupplierComponent },
      { path: 'viewsuppliers', component: ViewSupplierListComponent },
      { path: 'addmedicine', component: AddMedicineComponent },
      { path: 'ordermedicine', component: OrderMedicineComponent },
      { path: 'medicine-order-list', component: MedicineOrderListComponent },
      { path: 'medicine-list', component: MedicineListComponent },
      { path: 'medicine-sale', component: MedicineSaleComponent },
      { path: 'sale-list', component: SaleListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }