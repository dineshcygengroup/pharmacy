import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { FormBuilderService, HttpRequestHandlerService, Endpoints, NotificationHandlerService, AppWebUrls } from 'src/app/core';
import { Vendor } from '../../models/vendor';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import { Department } from '../../models/department';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PurchaseOrder, PurchaseOrderTableInput, ProductOrder } from '../../models/purchase-order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {
  public orderDetailsForm: FormGroup;
  public productDetailsForm: FormGroup;

  public vendorList: Vendor[] = [];
  public filteredVendorList: Observable<Vendor[]>;
  public productList: Product[] = [];
  public filteredProductList: Observable<Product[]>;
  public departmentList: Department[] = [];

  private cartItems: PurchaseOrderTableInput[] = [];
  displayableCartList: MatTableDataSource<PurchaseOrderTableInput>;

  displayedColumns: string[] = ['name', 'description', 'vendorName', 'quantity', 'price', 'sub-total', 'actions'];

  constructor(private router: Router,
              private formBuilder: FormBuilderService,
              private httpReqHandlerService: HttpRequestHandlerService,
              private notificationHandler: NotificationHandlerService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.orderDetailsForm = this.fb.group({
      orderDate: new Date(),
      requestedDate: new Date(''),
      requestedDepartment: '',
      remarks: '',
      product_list: this.fb.array([])
    });
    this.productDetailsForm = this.formBuilder.createForm<any>({
      vendor: '',
      product: '',
      quantity: ''
    });
    this.getProductList();
    this.getVendorList();
    this.getDepartmentList();
    this.subscribeForValueChanges();
  }

  public addOrder() {
    const newProductOrder = this.getNewProductOrder();
    const cartListArray = this.orderDetailsForm.get('product_list') as FormArray;
    const index = cartListArray.controls.findIndex(x =>
      x.value.vendorID === newProductOrder.get('vendorID').value &&
      x.value.productID ===  newProductOrder.get('productID').value
    );
    if (index === -1) {
      (this.orderDetailsForm.get('product_list') as FormArray).push(newProductOrder)
      this.updateDisplayCart(newProductOrder);
    } else {
      this.notificationHandler.showNotification('product already added in cart');
    }
  }

  public checkoutOrder() {
    this.httpReqHandlerService
      .post<PurchaseOrder, PurchaseOrder>(Endpoints.purchaseOrders, this.orderDetailsForm.value)
      .subscribe((response: HttpResponse<PurchaseOrder>) => {
          if (response.ok) {
              this.notificationHandler.showNotification('Product added successfully');
              this.router.navigate([AppWebUrls.purchaseOrderList], { queryParams: { id: response.body.id } });
          } else {
              this.notificationHandler.showNotification('Some error occurred while adding the product');
          }
      });
  }

  public displayVendorName(vendor?: Vendor): string | undefined {
    return vendor ? vendor.name : undefined;
  }

  public displayProductName(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  public deleteItemFromCart(element: PurchaseOrderTableInput) {
    const vendorId = this.getVendorId(element.vendorName);
    const productId = this.getProductId(element.productName);
    const cartListArray = this.orderDetailsForm.get('product_list') as FormArray;
    (this.orderDetailsForm.get('product_list') as FormArray).removeAt(
      cartListArray.controls.findIndex(x => x.value.vendorID === vendorId
                                          && x.value.productID === productId));
    this.cartItems = this.cartItems.filter((value, index, arr) => {
      if (JSON.stringify(value) !== JSON.stringify(element)) {
        return value;
      }
    });
    this.displayableCartList = new MatTableDataSource(this.cartItems);
    this.ref.detectChanges();
  }

  private getNewProductOrder(): FormGroup {
    return this.fb.group({
      vendorID: this.productDetailsForm.get('vendor').value.id,
      productID: this.productDetailsForm.get('product').value.id,
      quantity: this.productDetailsForm.get('quantity').value as number
    });
  }

  private updateDisplayCart(newProductOrder: FormGroup) {
    const vName = this.getVendorName(newProductOrder.value.vendorID);
    const product = this.getProduct(newProductOrder.value.productID);
    this.cartItems.push({
      vendorName: vName,
      productName: product.name,
      productDescription: product.description,
      price: product.price,
      quantity: newProductOrder.value.quantity
    });
    this.displayableCartList = new MatTableDataSource(this.cartItems);
    this.ref.detectChanges();
  }

  private getVendorName(vendorId: number) {
    return this.vendorList.find(x => x.id === vendorId).name;
  }

  private getVendorId(vendorName: string) {
    return this.vendorList.find(x => x.name === vendorName).id;
  }

  private getProduct(productId: number) {
    return this.productList.find(x => x.id === productId);
  }

  private getProductId(productName: string) {
    return this.productList.find(x => x.name === productName).id;
  }

  private getVendorList() {
    this.httpReqHandlerService
      .get<Vendor[]>(Endpoints.vendors)
      .pipe()
      .subscribe((response: HttpResponse<Vendor[]>) => {
        if (response.ok) {
          this.vendorList = response.body;
        }
      });
  }

  private getProductList() {
    this.httpReqHandlerService.get<Product[]>(Endpoints.products).pipe().subscribe((response: HttpResponse<Product[]>) => {
        if (response.ok) {
            this.productList = response.body;
        }
    });
  }

  private getDepartmentList() {
    this.httpReqHandlerService.get<Department[]>(Endpoints.departments).pipe().subscribe((response: HttpResponse<Department[]>) => {
        if (response.ok) {
            this.departmentList = response.body;
        }
    });
  }

  private subscribeForValueChanges() {
    this.filteredVendorList = this.productDetailsForm.get('vendor').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterVendor(name) : this.vendorList.slice())
    );
    this.filteredProductList = this.productDetailsForm.get('product').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterProduct(name) : this.productList.slice())
    );
  }

  private _filterVendor(name: string): Vendor[] {
    const filterValue = name.toLowerCase();
    return this.vendorList.filter(vendor => vendor.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterProduct(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.productList.filter(product => product.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
