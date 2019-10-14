import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpRequestHandlerService, Endpoints } from 'src/app/core';
import { HttpResponse } from '@angular/common/http';
import { PurchaseOrder } from '../../models/purchase-order';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrderSummaryTable } from '../../models/purchase-order-summary-table';
import { Product } from '../../models/product';
import { forkJoin, Observable } from 'rxjs';
import { Vendor } from '../../models/vendor';
import { ConfigReaderService } from '../../services/config-reader.service';

@Component({
  selector: 'app-purchase-order-summary',
  templateUrl: './purchase-order-summary.component.html',
  styleUrls: ['./purchase-order-summary.component.scss']
})
export class PurchaseOrderSummaryComponent implements OnInit {
  public fromDate = new FormControl();
  public toDate = new FormControl();
  public printableContent = {
    header: 'Inventory Applilcation'
  };
  public displayedColumns: string[] = ['orderId', 'orderDate', 'requestedDate',
                                      'requestedDepartment', 'purchaseStatus', 'remarks',
                                      'productName', 'vendorName', 'quantity', 'price'];
  public purchaseOrdersDataSource: MatTableDataSource<PurchaseOrderSummaryTable>;

  constructor(private httpReqHandlerService: HttpRequestHandlerService,
              private ref: ChangeDetectorRef,
              public configReader: ConfigReaderService) { }

  ngOnInit() {
  }

  public search() {
    this.getPurchaseOrders();
  }

  private getPurchaseOrders() {
    this.httpReqHandlerService.get<PurchaseOrder[]>(Endpoints.purchaseOrders).pipe().subscribe(
      (response: HttpResponse<PurchaseOrder[]>) => {
        if (response.ok) {
          this.preparePurchaseOrderSummaryTableData(response.body).subscribe( tableContent => {
            this.purchaseOrdersDataSource = new MatTableDataSource(tableContent);
            this.ref.detectChanges();
          });
        }
    });
  }

  private preparePurchaseOrderSummaryTableData(orders: PurchaseOrder[]) {
    const tableDataOserver = new Observable<PurchaseOrderSummaryTable[]>(observer => {
      // tslint:disable-next-line: prefer-const
      let ordersForTable: Array<PurchaseOrderSummaryTable> = [];
      orders.forEach(element => {
        element.product_list.forEach(x => {
          this.requestDataFromMultipleSources(x.productID, x.vendorID).subscribe(
            responseList => {
              const product = responseList[0].body as Product;
              const vendor = responseList[1].body as Vendor;
              ordersForTable.push({
                id: element.id,
                orderDate: element.orderDate,
                requestedDate: element.requestedDate,
                requestedDepartment: element.requestedDepartment,
                purchaseStatus: element.purchaseStatus,
                remarks: element.remarks,
                productName: product.name,
                vendorName: vendor.name,
                quantity: product.quantity,
                price: product.price
              });
              observer.next(ordersForTable);
          });
        });
      });
    });
    return tableDataOserver;
  }

  private requestDataFromMultipleSources(productId: number, vendorId: number ) {
    const productResponse = this.httpReqHandlerService.getItem<Product>(Endpoints.product, productId).pipe();
    const vendorResponse = this.httpReqHandlerService.getItem<Vendor>(Endpoints.vendor, vendorId).pipe();
    return forkJoin([productResponse, vendorResponse]);
  }
}
