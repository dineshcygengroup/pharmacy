import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SaleOrder, SaleStatus } from '../models/sale-order';
import { MatTable } from '@angular/material/table';
import { MatAutocompleteSelectedEvent, MatDialogConfig, MatDialog } from '@angular/material';
// import { patients } from 'src/app/core/services/in-memory-db.service';
import { Endpoints, HttpService } from 'src/app/core';
import { Medicine } from '../models/medicine';
import { MedicineCategory } from '../models/medicine-category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as user_config from "../../../assets/config.json";
import { Config } from '../models/config';
import { PaymentOption } from 'src/app/dialog/models/payment-option';
import { CustomerType } from '../models/customer-type';
import { SoldMedicine } from '../models/sold-medicine';
import { SimpleDialogComponent } from 'src/app/dialog';
import { Inpatients } from '../models/patients';

@Component({
    selector: 'app-medicine-sale',
    templateUrl: './medicine-sale.component.html',
    styleUrls: ['./medicine-sale.component.scss']
})
export class MedicineSaleComponent implements OnInit {
    @ViewChild(MatTable) table: MatTable<any>;
    displayedColumns: string[] = ['medicineName', 'sellingPrice', 'quantity', 'amount', 'action'];
    printableColumns: string[] = ['medicineName', 'sellingPrice', 'quantity', 'amount'];
    footerColumns: string[] = ['total'];

    customerTypeList: CustomerType[] = [];
    availableMedicineList: Medicine[] = [];
    filteredMedicineList: Observable<Medicine[]>;
    patinetList: string[] = [];
    patientList: Inpatients[] = [];
    filteredPatientList: Observable<string[]>;
    categoryList: MedicineCategory[];
    orderList: SaleOrder[] = [];
    dataSource: SaleOrder[] = [];
    paymentOptions: PaymentOption[] = [];
    config: Config;
    savedSaleOrder: SaleOrder;
    today = Date.now();
        
    // Form Controls
    customer:FormControl;
    patients:FormControl;
    patientName:FormControl;
    referredDoctorName:FormControl;
    paymentOption:FormControl;
    stockAvailable:FormControl;
    saleStatus:FormControl;
    medicineList:FormArray;
    selectedMedicine: FormControl; // user selected medicine
    selectedQuantity: FormControl; // user entered quantity for selected medicine

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.customer = new FormControl();
        this.patientName = new FormControl();
        this.referredDoctorName = new FormControl();
        this.paymentOption = new FormControl();
        this.stockAvailable = new FormControl();
        this.saleStatus = new FormControl();
        this.medicineList = new FormArray([]);
        this.selectedMedicine= new FormControl();
        this.selectedQuantity= new FormControl();
        this.patients = new FormControl();

        this.read_user_configuration()
        this.fetchCustomerTypeList();
        this.fetchMedicineList();
        this.fetchCategoryList();
        this.fetchPaymentOptions();
        this.subscribeForValueChanges();
        this.fetchpatientList();
    }

    private read_user_configuration() {
        this.config = <Config>{
            firm_name: user_config.firm_name,
            address : user_config.address

        }
    }
    //getpatients (): Observable<patients[]> {
    //return this.http.get<patients[]>(this.)
   //     }
    private fetchCustomerTypeList() {
        this.httpService.get(Endpoints.Customers).subscribe(
            response => { this.customerTypeList = <CustomerType[]> response}
        );
    }

    private fetchMedicineList() {
        this.httpService.get(Endpoints.Medicines).subscribe(
            response => { this.availableMedicineList = <Medicine[]> response}
        );
    }

    private fetchCategoryList() {
        this.httpService.get(Endpoints.MedicineCategory).subscribe(
            response => { this.categoryList = <MedicineCategory[]> response}
        );
    }

    private fetchPaymentOptions() {
        this.httpService.get(Endpoints.PaymentOptions).subscribe(
            response => { this.paymentOptions = <PaymentOption[]> response}
        );
    }

    private subscribeForValueChanges() {
        this.filteredMedicineList = this.selectedMedicine.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterMedicine(name) : this.availableMedicineList.slice())
        );
    }
    //in patient

    private fetchpatientList() {
        this.httpService.get(Endpoints.Inpatients).subscribe(
            response => { this.patientList = <Inpatients[]> response}
        );
    }

    displayMedicineName(medicine?: Medicine): string | undefined {
        return medicine ? medicine.name : undefined;
    }

    addToOrderList() {
        this.medicineList.push(this.patchMedicine());
    }

    isEnabled() {
        return this.selectedMedicineAvailableQuantity <= 0;
    }

    private patchMedicine() {
        let selectedMedicineValue = <Medicine>this.selectedMedicine.value;
        return this.formBuilder.group({
            name: selectedMedicineValue.name,
            category: selectedMedicineValue.category,
            quantity: this.selectedQuantity.value,
            price: selectedMedicineValue.price
        })    
    }

    get tableValues(): Medicine[] {
        return <Medicine[]>this.medicineList.value;
    }

    get selectedMedicineCategory(): string {
        let value = <Medicine>this.selectedMedicine.value;
        if (value) {
            return value.category ? value.category : '';
        }
        return null;
    }

    get selectedMedicinePrice(): string {
        let value = <Medicine>this.selectedMedicine.value;
        if (value) {
            return value.price? value.price : '';
        }
        return null;
    }


    get selectedMedicineAvailableQuantity(): number {
        let value = <Medicine>this.selectedMedicine.value;
        if (value) {
            return value.quantity? value.quantity : 0;
        }
        return null;
    }


    saveSale() {
        this.httpService.post(Endpoints.Sales, this.prepareSaleOrder()).subscribe(
            () => {
                this.openSimpleDialog('Saved sold items ');
            },
            error => {
                this.openSimpleDialog('failed to save sold items');
            }
        );
    }

    private resetUI() {
        // make table empty
        while (this.medicineList.length !== 0) {
            this.medicineList.removeAt(0)
        }
        // reset all form controls
        this.customer.reset();
        this.patientName.reset();
        this.referredDoctorName.reset();
        this.selectedMedicine.reset();
        this.selectedQuantity.reset();
        this.paymentOption.reset();
    }



    private getSoldMedicineList(): SoldMedicine[] {
        let soldMedicineList:SoldMedicine[] = [];
        this.tableValues.forEach(element => {
            let x: SoldMedicine = {
                medicineName: element.name,
                category: element.category,
                quantity: element.quantity,
                sellingPrice: element.price
            }
            soldMedicineList.push(x);
        });
        return soldMedicineList;
    }

    private prepareSaleOrder() {
        let saleOrder = {
            customer: this.customer.value,
            patientName: this.patientName.value,
            referredDoctorName: this.referredDoctorName.value,
            category: this.selectedMedicineCategory,
            paymentOption: this.paymentOption.value,
            stockAvailable: this.selectedMedicineAvailableQuantity,
            saleStatus: SaleStatus.PAID,
            medicine_list: this.getSoldMedicineList(),
            total: this.getTotalCost()
        }
        return saleOrder;
    }

    deleteMedicine(element: Medicine) {
        let deletableIndex = -1;
        let list = (<Medicine[]>this.medicineList.value)
        for (let index = 0; index < list.length; index++) {
            if (list[index].name === element.name && 
                list[index].category === element.category &&
                list[index].price === element.price &&
                list[index].quantity === element.quantity) {
                deletableIndex = index;
                break;
            }
        }
        this.medicineList.removeAt(deletableIndex);
    }

    private _filterMedicine(name: string): Medicine[] {
        const filterValue = name.toLowerCase();    
        return this.availableMedicineList.filter(supplier => supplier.name.toLowerCase().indexOf(filterValue) === 0);
    }

    getTotalCost() {
        let sum = 0;
        this.medicineList.value.forEach(x => sum += x.quantity * x.price);
        return sum;
    }

    private openSimpleDialog(message: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Save',
            body: message
        }
        let dialogRef = this.dialog.open(SimpleDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.resetUI();
        });
      }


}