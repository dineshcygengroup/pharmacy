// angular imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
// imports from feature modules
import { HttpService } from '../../core';
// same module imports
import { Medicine } from '../models/medicine';
import { MedicineDetailsEditComponent } from 'src/app/dialog/medicine-details-edit/medicine-details-edit.component';
import { SimpleDialogComponent } from 'src/app/dialog';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'genericName', 'price', 'quantity', 'expiryDate', 'location', 'category', 'batchNumber', 'supplier', 'actions'];
  dataSource: MatTableDataSource<Medicine>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private httpService: HttpService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchMedicineOrderList();
  }

  fetchMedicineOrderList() {
    this.httpService.getMedicineList().subscribe(
        response =>{
            this.dataSource = new MatTableDataSource(<Medicine[]>response);
            this.dataSource.sort = this.sort;
        }
    )
  }

  deleteMedicine(element: Medicine) {
    this.httpService.deleteMedicine(element).subscribe(
      () => {
        this.openSimpleDialog(`Medicine ${element.name} deleted successfully from list`);
      },
      () => {
        this.openSimpleDialog(`Failed to delete medicine ${element.name} from list`);
      }
    );
  }

  editMedicine(element: Medicine) {
      // TODO: edit supplier
      this.openMedicineEditDialog(element);
      this.fetchMedicineOrderList();
  }

  openMedicinedetailsWebPage(element: Medicine) {
    window.open(element.referenceLink);
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
      this.fetchMedicineOrderList();
    });
}

  private openMedicineEditDialog(element: Medicine) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '50%';
    dialogConfig.minHeight = '25%';
    dialogConfig.data = {
        title: 'Edit',
        medicine: element
    }
    this.dialog.open(MedicineDetailsEditComponent, dialogConfig).afterClosed().subscribe(
      () =>{ this.fetchMedicineOrderList();}
    );
  }

}
