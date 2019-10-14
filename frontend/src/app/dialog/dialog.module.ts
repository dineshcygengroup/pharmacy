import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialComponentsModule } from '../material-components/material-components.module';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { SupplierEditDialogComponent } from './supplier-edit-dialog/supplier-edit-dialog.component';
import { MedicineDetailsEditComponent } from './medicine-details-edit/medicine-details-edit.component';

@NgModule({
    declarations: [
        SimpleDialogComponent,
        PurchaseOrderEditComponent,
        SupplierEditDialogComponent,
        MedicineDetailsEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MaterialComponentsModule
    ],
    entryComponents: [
        SimpleDialogComponent,
        PurchaseOrderEditComponent,
        SupplierEditDialogComponent,
        MedicineDetailsEditComponent
    ],
    exports: [
        SimpleDialogComponent,
        PurchaseOrderEditComponent,
        SupplierEditDialogComponent,
        MedicineDetailsEditComponent
    ]
})
export class DialogModule { }
