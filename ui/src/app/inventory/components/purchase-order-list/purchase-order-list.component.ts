import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilderService, HttpRequestHandlerService, Endpoints, NotificationHandlerService } from 'src/app/core';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrder, PurchaseOrderStatus } from '../../models/purchase-order';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  public purchaseOrderListForm: FormGroup;
  public displayedColumns: string[] = ['orderId', 'orderDate', 'requestedDate',
                                       'requestedDepartment', 'purchaseStatus', 'remarks', 'actionsColumn'];
  public purchaseOrdersDataSource: MatTableDataSource<PurchaseOrder>;
  public isEditMode = false;
  public orderStatus: FormControl = new FormControl('');
  public selectedStatus = '';
  public purchaseOrderStatusValues: string[] = Object.keys(PurchaseOrderStatus);

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilderService,
              private httpReqHandlerService: HttpRequestHandlerService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.readPageQueryParams();
    this.purchaseOrderListForm = this.formBuilder.createForm<any>({
      orderId: '',
      productName: '',
      vendorName: '',
      orderDate: ''
    });
    this.purchaseOrdersDataSource = new MatTableDataSource([]);
  }

  private readPageQueryParams() {
    this.activatedRoute.queryParams.subscribe((data: ParamMap) => {
        if ('id' in data) {
            // tslint:disable-next-line: no-string-literal
            const orderId: number = data['id'] as number;
            this.getPurchaseOrderById(orderId);
        }
    });
  }

  public getPurchaseOrderById(orderId?: number) {
    if (!orderId) {
      orderId = this.purchaseOrderListForm.get('orderId').value;
    }
    this.httpReqHandlerService
      .get<PurchaseOrder>(Endpoints.purchaseOrder + orderId + '/')
      .pipe()
      .subscribe((response: HttpResponse<PurchaseOrder>) => {
        if (response.ok) {
          this.selectedStatus = (response.body as PurchaseOrder).purchaseStatus;
          this.purchaseOrdersDataSource = new MatTableDataSource([response.body]);
        }
      });
  }

  public editRow(id: number) {
    this.isEditMode = true;
    this.ref.detectChanges();
  }

  public editComplete(id: number) {
    this.isEditMode = false;
    const rowData = this.purchaseOrdersDataSource.data[0] as unknown as PurchaseOrder;
    rowData.purchaseStatus = PurchaseOrderStatus[this.selectedStatus];
    this.httpReqHandlerService.putItem<PurchaseOrder, PurchaseOrder>(Endpoints.purchaseOrder, id, rowData)
    .pipe().subscribe((response: HttpResponse<PurchaseOrder>) => {
      if (response.ok) {
        this.purchaseOrdersDataSource = new MatTableDataSource([response.body]);
        this.ref.detectChanges();
      }
    });
  }
}
