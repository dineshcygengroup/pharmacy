import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarConfig, SimpleSnackBar } from "@angular/material";
import { HttpService } from "src/app/core";
import { Supplier } from "src/app/pharmacy/models/supplier";
import { ViewSupplierListComponent } from 'src/app/pharmacy/view-supplier-list/view-supplier-list.component';

@Component({
  selector: "app-supplier-edit-dialog",
  templateUrl: "./supplier-edit-dialog.component.html",
  styleUrls: ["./supplier-edit-dialog.component.scss"]
})
export class SupplierEditDialogComponent implements OnInit {
    updateStatus: boolean;
    supplierForm: FormGroup;
    constructor(
        private dialogRef: MatDialogRef<SupplierEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private _snackBar: MatSnackBar
    ) {
        this.supplierForm = this.formBuilder.group({
            id: new FormControl(this.data.supplier.id),
            name: new FormControl(this.data.supplier.name),
            altPhoneNumber: new FormControl(this.data.supplier.altPhoneNumber),
            phoneNumber: new FormControl(this.data.supplier.phoneNumber),
            contactPerson: new FormControl(this.data.supplier.contactPerson),
            address: new FormControl(this.data.supplier.address),
            email: new FormControl(this.data.supplier.email),
            landlineNumber: new FormControl(this.data.supplier.landlineNumber)
        });
    }

    ngOnInit() {}

    close() {
        this.dialogRef.close();
    }

    update() {
        this.httpService.updateSupplier(<Supplier>this.supplierForm.value).subscribe((response) => {
            this.openSnackBar('Successfully updated supplier details');
            this.close();
            console.info(JSON.stringify(response));
        },
        () => { 
            this.openSnackBar('Successfully updated supplier details');
            this.close();
        });
    }

    private openSnackBar(message: string) {
        let config = new MatSnackBarConfig();
        config.duration = 10000;
        config.horizontalPosition = 'right';
        config.verticalPosition = 'top';
        config.data = {
            message: message
        };
        this._snackBar.openFromComponent(SimpleSnackBar, config);
      }
}
