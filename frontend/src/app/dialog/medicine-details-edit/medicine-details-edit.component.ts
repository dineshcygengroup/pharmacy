import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService, Endpoints } from 'src/app/core';
import { Supplier } from 'src/app/pharmacy/models/supplier';
import { Observable } from 'rxjs';
import { StoreLocation } from 'src/app/pharmacy/models/store-location';
import { MedicineCategory } from 'src/app/pharmacy/models/medicine-category';
import { startWith, map } from 'rxjs/operators';
import { Medicine } from 'src/app/pharmacy/models/medicine';

@Component({
  selector: 'app-medicine-details-edit',
  templateUrl: './medicine-details-edit.component.html',
  styleUrls: ['./medicine-details-edit.component.scss']
})
export class MedicineDetailsEditComponent implements OnInit {
  addMedicineForm: FormGroup;
  supplierList: Supplier[] = [];
  filteredSuppliers: Observable<Supplier[]>;
  locationList: StoreLocation[] = [];
  filteredLocations: Observable<StoreLocation[]>;
  categoryList: MedicineCategory[] = [];
  todayDate: Date = new Date();
  
  constructor(
    private dialogRef: MatDialogRef<MedicineDetailsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private httpService: HttpService) { }

  ngOnInit() {
    this.addMedicineForm = this.formBuilder.group({
      id: new FormControl(this.data.medicine.id),
      name: new FormControl(this.data.medicine.name),
      genericName: new FormControl(this.data.medicine.genericName),
      quantity: new FormControl(this.data.medicine.quantity),
      category: new FormControl(this.data.medicine.category),
      medicineDetails: new FormControl(this.data.medicine.medicineDetails),
      batchNumber: new FormControl(this.data.medicine.batchNumber),
      expiryDate: new FormControl(this.data.medicine.expiryDate),
      location: new FormControl(this.data.medicine.location),
      price: new FormControl(this.data.medicine.price),
      referenceLink: new FormControl(this.data.medicine.referenceLink),
      supplier: new FormControl(this.data.medicine.supplier),
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

  update() {
    let medicine = <Medicine>this.addMedicineForm.value
    this.httpService.put(`${Endpoints.Medicine}${medicine.id}`, medicine).subscribe(() => {this.close()});
  }

  close() {
    this.dialogRef.close();
  }

}
