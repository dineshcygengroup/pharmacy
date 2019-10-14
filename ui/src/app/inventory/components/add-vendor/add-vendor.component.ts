import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Endpoints } from 'src/app/core/models/endpoints.enum';
import { Vendor } from '../../models/vendor';
import { FormBuilderService, NotificationHandlerService, HttpRequestHandlerService, AppWebUrls } from 'src/app/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  private vendor: Vendor = <Vendor>{};
  private isEditMode: boolean = false;
  addVendorForm: FormGroup;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilderService,
    private notificationHandler: NotificationHandlerService,
    private httpReqHandlerService: HttpRequestHandlerService) { }

  ngOnInit() {
    this.addVendorForm = this.formBuilder.createForm<Vendor>({
      name: "",
      phoneNumber: "",
      contactName: "",
      address: "",
      email: "",
      website: "",
      remarks: ""
    });
    this.readPageQueryParams();
  }

  private readPageQueryParams() {
    this.activatedRoute.queryParams.subscribe((data: ParamMap) => {
        if ('id' in data) {
            this.isEditMode = true;
            const vendorID: number = <number>data['id'];
            this.getVendorByID(vendorID);
        }
        else {
            this.isEditMode = false;
        }
    });
  }

  private getVendorByID(id: number) {
    this.httpReqHandlerService.getItem<Vendor>(Endpoints.vendor, id).subscribe((response: HttpResponse<Vendor>) => {
        if (response.ok) {
            this.vendor = response.body;
            this.formBuilder.setFormValue(this.addVendorForm, this.vendor);
        }
        else {
            this.notificationHandler.showNotification(`error occured while fetching vendor with id ${id}`);
        }
    });
  }

  public save() {
    const vendorData: Vendor = this.formBuilder.getFormValue<Vendor>(
        this.addVendorForm
    );
    if (this.isEditMode) {
        this.updateVendor(<number>this.vendor.id, vendorData);
    }
    else {
        this.addProduct();
    }
  }

  private updateVendor(id: number, vendor: Vendor) {
    this.httpReqHandlerService.put(`${Endpoints.vendor}${id}/`, vendor).subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
            this.notificationHandler.showNotification(`vendor updated successfully`);
            this.router.navigate([AppWebUrls.vendorList]);
        }
        else {
            this.notificationHandler.showNotification(`Failed to update the vendor details`);
        }
    });
  }

  private addProduct() {
    const vendorData: Vendor = this.formBuilder.getFormValue<Vendor>(this.addVendorForm);
    this.httpReqHandlerService.post<Vendor, Vendor>(Endpoints.vendors, vendorData)
    .subscribe((response: HttpResponse<Vendor>) => {
        if (response.ok) {
            this.notificationHandler.showNotification('Vendor added successfully');
            this.router.navigate([AppWebUrls.vendorList]);
        }
        else {
            this.notificationHandler.showNotification('Failed to add the vendor');
        }
    });
  }
}
