// angular imports
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { Supplier } from '../models/supplier';
import { Medicine } from '../models/medicine';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { SimpleDialogComponent } from 'src/app/dialog/simple-dialog/simple-dialog.component';
import { MedicineCategory } from '../models/medicine-category';
import { StoreLocation } from '../models/store-location';


@Component({
    selector: 'app-add-medicine',
    templateUrl: './add-medicine.component.html',
    styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
    addMedicineForm: FormGroup;
    
    supplierList: Supplier[] = [];
    filteredSuppliers: Observable<Supplier[]>;

    locationList: StoreLocation[] = [];
    filteredLocations: Observable<StoreLocation[]>;

    categoryList: MedicineCategory[] = [];
    todayDate: Date = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.addMedicineForm = this.formBuilder.group({
            batchNumber: [''],
            quantity: [''],
            category: [''],
            expiryDate: [''],
            genericName: [''],
            location: [''],
            medicineDetails: [''],
            name: [''],
            price: [''],
            referenceLink: [''],
            supplier: [''],
        });
        
        this.fetchSupplierNameList();
        this.fetchLocationList();
        this.fetchCategoryList();
        this._subscribeForValueChanges();
    }

    fetchSupplierNameList() {
        this.httpService.getSupplierList().subscribe(data => {
            this.supplierList = <Supplier[]>data;
        });
    }

    fetchLocationList() {
        this.httpService.getStoreLocationList().subscribe(data => {
            this.locationList = <StoreLocation[]>data;
        });
    }

    fetchCategoryList() {
        this.httpService.getMedicineCategoryList().subscribe(data => {
            this.categoryList = <MedicineCategory[]>data;
        });
    }

    displaySupplier(supplier?: Supplier): string | undefined {
        return supplier ? supplier.name : undefined;
    }

    private _subscribeForValueChanges() {

        this.filteredSuppliers = this.addMedicineForm.get('supplier').valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterSuppliers(name) : this.supplierList.slice())
        );

        this.filteredLocations = this.addMedicineForm.get('location').valueChanges.pipe(
            startWith(''),
            map(value => this._filterLocation(value))
        );
    }

    private _filterSuppliers(name: string): Supplier[] {
        const filterValue = name.toLowerCase();
    
        return this.supplierList.filter(supplier => supplier.name.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterLocation(value: string): StoreLocation[] {
        const filterValue = value.toLowerCase();   
        return this.locationList.filter(location => location.storeLocation.toLowerCase().indexOf(filterValue) === 0);
    }


    onSave(addAnother=false) {
        this.httpService.addMedicine(<Medicine>this.addMedicineForm.value).subscribe(
            () => {
                this.openSimpleDialog(this.addMedicineForm.value.name);
                if (addAnother) {
                    this.addMedicineForm.reset();
                }
            },
            (error) => {
                alert('Failed to add medicine to databsae');
                console.warn(error);
            }
        )
    }

    private openSimpleDialog(medicineName: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Add',
            body: `${medicineName} added to medicine list successfully`
        }
        this.dialog.open(SimpleDialogComponent, dialogConfig);
    }

}
