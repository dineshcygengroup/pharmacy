import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-simple-dialog",
  templateUrl: "./simple-dialog.component.html",
  styleUrls: ["./simple-dialog.component.scss"]
})
export class SimpleDialogComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<SimpleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {}

    close() {
        this.dialogRef.close();
    }
}
