// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HostComponent } from '../core/host/host.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { AddPurchaseOrderComponent } from './components/add-purchase-order/add-purchase-order.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderSummaryComponent } from './components/purchase-order-summary/purchase-order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: HostComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-vendor', component: AddVendorComponent },
      { path: 'vendor-list', component: VendorListComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'product-list', component: ProductsListComponent },
      { path: 'add-purchase-order', component: AddPurchaseOrderComponent },
      { path: 'purchase-order-list', component: PurchaseOrderListComponent },
      { path: 'purchase-order-summary', component: PurchaseOrderSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
