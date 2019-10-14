// angular imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { Supplier } from '../models/supplier';
import { SimpleDialogComponent } from 'src/app/dialog/simple-dialog/simple-dialog.component';
import { SupplierEditDialogComponent } from 'src/app/dialog';

@Component({
    selector: 'app-view-supplier-list',
    templateUrl: './view-supplier-list.component.html',
    styleUrls: ['./view-supplier-list.component.scss']
})
export class ViewSupplierListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'contactPerson', 'phoneNumber', 'altPhoneNumber', 'address', 'landlineNumber', 'email', 'actions'];
    dataSource: MatTableDataSource<Supplier>;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private httpService: HttpService,
        private dialog: MatDialog) { }
    
    ngOnInit() {
        this.getSupplierList();
    }
    
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    getSupplierList() {
        this.httpService.getSupplierList().subscribe( data => {
            this.dataSource = new MatTableDataSource(<Supplier[]>data);
            this.dataSource.sort = this.sort;
        });
    }

    deleteSupplier(supplier: Supplier) {
        this.httpService.deleteSupplier(supplier.id).subscribe(() => {
            this.openSimpleDialog(`${supplier.name} deleted from supplier list successfully`);
            this.getSupplierList();
        },
        () => {
            this.openSimpleDialog(`failed to delete ${supplier.name} from list`);
        })
    }

    editSupplier(supplier: Supplier) {
        this.openEditSupplierDialog(supplier);
        this.getSupplierList();
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
            body: message
        }
        let dialogRef = this.dialog.open(SimpleDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.getSupplierList();
        });
    }

    private openEditSupplierDialog(supplier: Supplier) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = '35%';
        dialogConfig.minHeight = '25%';
        dialogConfig.data = {
            title: 'Edit Supplier Details',
            supplier: supplier
        }
        let dialogRef = this.dialog.open(SupplierEditDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.getSupplierList();
        });
    }

}