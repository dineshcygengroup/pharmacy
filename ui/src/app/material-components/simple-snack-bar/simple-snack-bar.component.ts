import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-simple-snack-bar',
  templateUrl: './simple-snack-bar.component.html',
  styleUrls: ['./simple-snack-bar.component.scss']
})
export class SimpleSnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }
}
