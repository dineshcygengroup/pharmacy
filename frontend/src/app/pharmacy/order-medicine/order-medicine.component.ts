// angular imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { Supplier } from '../models/supplier';
import { Medicine } from '../models/medicine';
import { PurchaseOrder, PurchaseOrderStatus } from '../models/purchase-order';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { PopupInfo } from '../models/popup-info';
import { SimpleDialogComponent } from 'src/app/dialog/simple-dialog/simple-dialog.component';
import { MedicineCategory } from '../models/medicine-category';

@Component({
    selector: 'app-order-medicine',
    templateUrl: './order-medicine.component.html',
    styleUrls: ['./order-medicine.component.scss']
})
export class OrderMedicineComponent implements OnInit {

    orderMedicineForm: FormGroup;
    medicineList: Array<Medicine> = [];
    supplierList: Array<Supplier> = [];
    todayDate: Date;
    categoryList: MedicineCategory[] = [];

    constructor(private formBuilder: FormBuilder,
        private httpService: HttpService,
        public dialog: MatDialog) { }
    
    ngOnInit() {
        this.todayDate = new Date();
        this.orderMedicineForm = this.formBuilder.group({
            medicine: [''],
            supplier: [''],
            quantity: [''],
            medicineCategory: [''],
            details: [''],
            fulfillmentDate: [''],
            orderStatus: [PurchaseOrderStatus.ORDERED]
        });
        this.fetchMedicineList();
        this.fetchSupplierNameList();
        this.fetchCategoryList();
    }

    private fetchSupplierNameList() {
        this.httpService.getSupplierList().subscribe(data => {
            this.supplierList = <Supplier[]>data;
        });
    }

    private fetchMedicineList() {
        this.httpService.getMedicineList().subscribe(
            response => {
                this.medicineList = <Medicine[]>response;
            }
        )
    }

    private fetchCategoryList() {
        this.httpService.getMedicineCategoryList().subscribe(data => {
            this.categoryList = <MedicineCategory[]>data;
        });
    }

    onSubmit(addMore=false) {
        this.httpService.addMedicineOrder(<PurchaseOrder>this.orderMedicineForm.value).subscribe(
            () => {
                this.openSimpleDialog('medicine order completed');
                if (addMore) {
                    this.orderMedicineForm.reset();
                }
            },
            () => {
                this.openSimpleDialog('Failed to order medicine');
            }
        );
    }

    private openSimpleDialog(displayableMessage: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Status',
            body: `${displayableMessage}`
        }
        this.dialog.open(SimpleDialogComponent, dialogConfig);
    }

}
