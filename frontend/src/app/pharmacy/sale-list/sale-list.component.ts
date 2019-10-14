import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SaleOrder } from '../models/sale-order';
import { HttpService, Endpoints } from 'src/app/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'patientName',
    'referredDoctorName',
    'paymentOption',
    'total',
    'saleStatus'
  ];
  dataSource: MatTableDataSource<SaleOrder>;
  expandedElement: SaleOrder | null;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.fetchSaleList();
  }

  fetchSaleList() {
    this.httpService.get(Endpoints.Sales).subscribe(
        response =>{
            this.dataSource = new MatTableDataSource(<SaleOrder[]>response);
        }
    )
}

}
