// angular imports
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { PurchaseOrder } from '../models/purchase-order';
import { PurchaseOrderEditComponent, SimpleDialogComponent } from 'src/app/dialog';

@Component({
    selector: 'app-medicine-order-list',
    templateUrl: './medicine-order-list.component.html',
    styleUrls: ['./medicine-order-list.component.scss']
})
export class MedicineOrderListComponent implements OnInit {
    displayedColumns: string[] = ['orderId', 'medicineName', 'medicineCategory', 'supplierName', 'quantity', 'fulfillmentDate', 'details', 'status', 'actions'];
    dataSource: MatTableDataSource<PurchaseOrder>;
    constructor(
        private httpService: HttpService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.fetchMedicineOrderList();
    }

    fetchMedicineOrderList() {
        this.httpService.getMedicineOrderList().subscribe(
            response =>{
                this.dataSource = new MatTableDataSource(<PurchaseOrder[]>response);
            }
        )
    }

    deleteOrder(element: PurchaseOrder) {
        this.httpService.deleteMedicineOrder(element.id).subscribe(
            () => {
                this.openSimpleDialog('Order delete success');
            },
            (error) => {
                this.openSimpleDialog('Failed to delete' + '\n' + error);
            }
        )
    }

    editOrder(element: PurchaseOrder) {
        this.openPurchaseOrderEditDialog(element);
    }

    private openSimpleDialog(message: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Delete',
            body: `${message}`
        }
        this.dialog.open(SimpleDialogComponent, dialogConfig).afterClosed().subscribe(
            () => { this.fetchMedicineOrderList();}
        );
    }

    private openPurchaseOrderEditDialog(element: PurchaseOrder) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '30%';
        dialogConfig.minHeight = '55%';
        dialogConfig.data = {
            title: 'Edit Purchase Order',
            purchaseOrder: element
        };
        let dialogRef = this.dialog.open(PurchaseOrderEditComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            () => {this.fetchMedicineOrderList();}
        );
    }

}
