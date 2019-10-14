import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { PaymentOption } from "../models/payment-option";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { HttpService } from 'src/app/core';
import { PurchaseOrder, PurchaseOrderStatus } from 'src/app/pharmacy/models/purchase-order';
import { PurchaseTaxOption } from 'src/app/pharmacy/models/purchase-tax-option';

@Component({
  selector: "app-purchase-order-edit",
  templateUrl: "./purchase-order-edit.component.html",
  styleUrls: ["./purchase-order-edit.component.scss"]
})
export class PurchaseOrderEditComponent implements OnInit {
  // variables
  orderEditForm: FormGroup;
  todayDate: Date = new Date();
  expiryDate: FormControl = new FormControl();
  paymentType: FormControl = new FormControl(['']);
  receivedDate: FormControl = new FormControl();

  paymentOptions: PaymentOption[] = [];
  purchaseTaxList: PurchaseTaxOption[] = [];

  constructor(
    private dialogRef: MatDialogRef<PurchaseOrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.orderEditForm = this.formBuilder.group({
      id: new FormControl(this.data.purchaseOrder.id),
      medicine: new FormControl(this.data.purchaseOrder.medicine),
      supplier: new FormControl(this.data.purchaseOrder.supplier),
      quantity: new FormControl(this.data.purchaseOrder.quantity),
      medicineCategory: new FormControl(this.data.purchaseOrder.medicineCategory),
      fullfillmentDate: new FormControl(this.data.purchaseOrder.fullfillmentDate),
      batchNumber: new FormControl(this.data.purchaseOrder.batchNumber),
      expiryDate: new FormControl(this.data.purchaseOrder.expiryDate),
      costPrice: new FormControl(this.data.purchaseOrder.costPrice),
      maxRetailPrice: new FormControl(this.data.purchaseOrder.maxRetailPrice),
      paymentType: new FormControl(this.data.purchaseOrder.paymentType),
      purchaseTax: new FormControl(this.data.purchaseOrder.purchaseTax),
      orderStatus: new FormControl(this.data.purchaseOrder.orderStatus),
      details: new FormControl(this.data.purchaseOrder.details)
    })

    this.fetchPaymentOptions();
    this.fetchPurchaseTaxOptions();
  }

  get batchNumber(): string {
      return this.data.batchNumber ? this.data.batchNumber : '';
  }

  set batchNumber(batch: string) {
      this.data.batchNumber = batch;
  }

  private fetchPaymentOptions() {
    this.httpService.getPaymentOptionList().subscribe(
      response => {this.paymentOptions = <PaymentOption[]>response}
    );
  }

  private fetchPurchaseTaxOptions() {
    this.httpService.getPurchaseTaxList().subscribe(
      response => {this.purchaseTaxList = <PurchaseTaxOption[]>response}
    );
  }

  displayPaymentOption(paymentOption?: PaymentOption): string | undefined {
    return paymentOption ? paymentOption.paymentType : undefined;
  }

  save() {
    let order = <PurchaseOrder>this.orderEditForm.value;
    order.orderStatus = PurchaseOrderStatus.RECEIVED;
    this.httpService.updateMedicineOrder(order).subscribe(
      ()=>{this.close()}
    )
  }

  close() {
    this.dialogRef.close();
  }
}
