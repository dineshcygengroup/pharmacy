import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupInfo } from '../models/popup-info';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent {

  // constructor(public dialogRef: MatDialogRef<PopupDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: PopupInfo) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
