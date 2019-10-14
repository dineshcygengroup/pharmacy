import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";

import { Vendor } from "../../models/vendor";
import { Endpoints } from "src/app/core/models/endpoints.enum";
import { HttpRequestHandlerService, NotificationHandlerService, AppWebUrls } from "src/app/core";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.scss"]
})
export class VendorListComponent implements OnInit {
  public appWebUrls = AppWebUrls;
  displayedColumns: string[] = [
    "name",
    "contactName",
    "phoneNumber",
    "email",
    "website",
    "address",
    "actions"
  ];
  vendorDataSource: MatTableDataSource<Vendor>;
  vendorList: Vendor[] = [];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpReqHandlerService: HttpRequestHandlerService,
    private notificationHandler: NotificationHandlerService) {}

  ngOnInit() {
    this.getVendorList();
  }

  applyFilter(filterValue: string) {
    this.vendorDataSource.filter = filterValue.trim().toLowerCase();
  }

  getVendorList() {
    this.httpReqHandlerService
      .get<Vendor[]>(Endpoints.vendors)
      .pipe()
      .subscribe((response: HttpResponse<Vendor[]>) => {
        if (response.ok) {
          this.vendorList = response.body;
          this.vendorDataSource = new MatTableDataSource(this.vendorList);
        }
      });
  }

  public deleteRow(id: number) {
    this.httpReqHandlerService.delete(`${Endpoints.vendor}${id}`).subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
            this.getVendorList();
            this.notificationHandler.showNotification(`vendor deleted successfully`);
        }
    });
}
}
