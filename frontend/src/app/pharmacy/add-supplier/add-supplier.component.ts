// angular imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { Supplier } from '../models/supplier';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SimpleDialogComponent } from 'src/app/dialog/simple-dialog/simple-dialog.component';


@Component({
    selector: 'app-add-supplier',
    templateUrl: './add-supplier.component.html',
    styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

    addSupplierForm: FormGroup;
    phoneNumber: number;

    constructor(private formBuilder: FormBuilder,
        private httpService: HttpService,
        private router: Router,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.addSupplierForm = this.formBuilder.group({
            name: [''],
            phoneNumber: [''],
            altPhoneNumber: [''],
            landlineNumber: [''],
            contactPerson: [''],
            address: [''],
            email: ['', Validators.email]
        });
    }

    hasError(event: any): void {
        if (!event && this.addSupplierForm.value.phoneNumber !== '') {
          this.addSupplierForm.get('phoneNumber').setErrors(['invalid_cell_phone', true]);
        }
      }

    onSave(redirect=true) {
        this.httpService.addSupplier(<Supplier>(this.addSupplierForm.value)).subscribe(
            () => {
                this.openSimpleDialog(this.addSupplierForm.value.name);
                if(redirect) {
                    this.router.navigate(['/pharmacy/viewsuppliers'])
                }
            },
            err => {
                console.warn(err)
            }
        );
    }

    saveAndAdd() {
        this.onSave(false);
        this.addSupplierForm.reset();
    }

    private openSimpleDialog(supplierName: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Add',
            body: `${supplierName} added to supplier list successfully`
        }
        this.dialog.open(SimpleDialogComponent, dialogConfig);
    }

}
